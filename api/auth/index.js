import passport from 'passport';
import mongoose from 'mongoose';
import expressJwt from 'express-jwt';

// handlers
import facebookHandling from './facebook';
import googleHandling from './google';
import localHandling from './local';

// models
const User = mongoose.model('User');

// utils
import cleanUserObj from './utils/cleanUserObj';
import setJwt from './utils/setJwt';


export default api => {
  api.use(passport.initialize());

  // need these even though we don't have session due to library bug
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  // will parse included JWT from cookie and set as req.jwt
  api.use(expressJwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
    requestProperty: 'jwt',
    getToken: req => req.cookies.auth_token,
  }));

  // retrieve user from DB if jwt exists
  api.use((req, res, next) =>
    !req.jwt ? next() :
    User.findById(req.jwt._id, null, { lean: true }) // lean gives us back plain object(not mongoose object)
      .then(user => {
        req.user = cleanUserObj(user); // remove password + salt
        if (req.user) setJwt(req, res); // update jwt with new expiry
        next();
      })
      .catch(err => console.log(err))
  );

  // Gets user off session if logged in (checked upon initial get request)
  api.get('/session', (req, res) => {
    if(!req.user) return res.status(200).json(null); // if no user is attached to request
    res.status(200).json(req.user)
  });

  // Simple /logout route.
  api.get('/logout', (req, res) => {
    res.clearCookie('auth_token');
    res.status(200).end();
  });

  // handlers for different types of authentication
  googleHandling(api);
  facebookHandling(api);
  localHandling(api);

  // all login types will want to do this
  api.use((req, res) => {
    setJwt(req, res);
    res.json(cleanUserObj(req.user));
  })

  return api;
};
