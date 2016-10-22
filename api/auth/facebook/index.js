// passport
import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';

// utilities
import _ from 'lodash';
import setJwt from '../utils/setJwt';

// models
import mongoose from 'mongoose';
const User = mongoose.model('User');

const facebookCredentials = {
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL: process.env.FACEBOOK_CLIENT_CALLBACK,
  profileFields: ['email', 'photos', 'link'], // this is the Google strategy's equivalent of "scope"
};

const verifyCallback = (accessToken, refreshToken, profile, done) =>
  User.findOne({ email: _.get(profile, 'emails[0].value') })
    .then(user =>
      _.get(user, 'facebook._id') ?
      Promise.resolve(user) : // no need to fill in profile if user already has Facebook log-in
      _.merge(user || new User(), { // use Facebook profile to fill out user info if it does not already exist
        email: _.get(user, 'email', _.get(profile, 'emails[0].value')), // in case user has not provided email
        firstName: _.get(user, 'firstName', profile.name.givenName),
        lastName: _.get(user, 'lastName', profile.name.familyName),
        userPhoto: _.get(user, 'userPhoto', _.get(profile, 'photos[0].value', _.get(profile, '_json.image.url', _.get(profile, '_json.picture')))),
        facebook: {
          _id: profile.id,
          photo: _.get(profile, 'photos[0].value', _.get(profile, '_json.image.url', _.get(profile, '_json.picture'))),
          link: profile.profileUrl
        }
      }).save())
    .then(user => done(null, user))
    .catch(err => console.error('Error creating user from Facebook authentication', err) || done(err, null));

passport.use(new FacebookStrategy(facebookCredentials, verifyCallback));

const passportAuth = passport.authenticate('facebook', {
  scope: 'email'
});

const passportAuthCb = passport.authenticate('facebook', {
  failureRedirect: '/',
  scope: 'email',
  session: false
});

const passportAuthCbCb = (req, res) => {
  setJwt(req, res);
  res.redirect('/');
}

export default app => {
  app.get('/facebook', passportAuth);
  app.get('/facebook/callback', passportAuthCb, passportAuthCbCb);
};
