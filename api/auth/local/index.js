import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import mongoose from 'mongoose';

import loginHandler from './login';
import addPasswordHandler from './addPassword';
import signupHandler from './signup';

const User = mongoose.model('User');

// provides passport.authenticate('local') method
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
}, strategyFn));

// When passport.authenticate('local') is used, this function will receive
// the email and password to run the actual authentication logic.
function strategyFn(email, password, done) {
  User.findOne({email})
    .then(user =>
      // user.correctPassword is a method from the User schema.
      !user || !user.correctPassword(password) ?
        done(null, null) :
        // Properly authenticated.
        done(null, user))
    .catch(err => done(err));
}

export default api => {
  loginHandler(api);
  addPasswordHandler(api);
  signupHandler(api);
}
