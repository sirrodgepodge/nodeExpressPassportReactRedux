// models
import mongoose from 'mongoose';
const User = mongoose.model('User');

// utility
import _ from 'lodash';
import cleanUserObj from '../../utils/cleanUserObj';


export default api => api.post('/signup', signupMiddleWare)

export function signupMiddleWare(req, res, next) {
  User.findOne({email: req.body.email})
    .then(foundUser => !foundUser ?
      new User({
        ...req.body,
        email: req.body.email
      }).save() :
      foundUser.password ?
      Promise.reject({error: 'A user with this email already exists', status: 401}) :
      Promise.reject({error: 'It looks as though you\'ve signed up through Facebook or Google, log with that method and add a password to your account if you\'d like', status: 401}))
      .then(storedUser => req.logIn(storedUser, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }

        req.user = storedUser;
        next();
      }))
      .catch(error => res.status(401).json(error));
}
