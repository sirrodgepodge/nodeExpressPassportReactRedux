import passport from 'passport';
import mongoose from 'mongoose';
import expressJwt from 'express-jwt';
import jwt from 'jsonwebtoken';

import facebookHandling from './facebook';
import googleHandling from './google';
import localHandling from './local';

const User = mongoose.model('User');


export default api => {
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
        next();
      })
      .catch(err => console.log(err))
  );

  // Initialize passport and also allow it to read
  api.use(passport.initialize());

  // Gets user off session if logged in (checked upon initial get request)
  api.get('/session', (req, res) => {
    if(!req.user) return res.status(200).json(null); // if no user is attached to request

    setJwt(req, res); // update jwt with net timeout
    res.status(200).json(req.user)
  });

  // Simple /logout route.
  api.get('/logout', (req, res) => {
    res.clearCookie('auth_token');
    res.status(200).end();
  });

  // handlers for different types of authentication
  facebookHandling(api);
  googleHandling(api);
  localHandling(api);

  // all login types will want to do this
  api.use((req, res) => {
    setJwt(req, res);
    res.json(cleanUserObj(req.user));
  })

  return api;
};


function setJwt(req, res) {
  const expiresIn = process.env.JWT_LENGTH || 60 * 60 * 24 * 180 * 1000; // default to 180 days
  const token = jwt.sign({ _id: req.user._id.toString() }, process.env.JWT_SECRET, { expiresIn });
  res.cookie('auth_token', token, {
    maxAge: expiresIn,
    httpOnly: true
  });
}


function cleanUserObj(user) {
  user.hasPassword = !!user.password;
  delete user.password;
  delete user.salt;
  return user;
}
