import passport from 'passport';
import mongoose from 'mongoose';


export default api => {
  // A POST /login route is created to handle login.
  api.post('/auth/login', (req, res, next) => {
    // handles authentication, have to deal with restful response in callback
    passport.authenticate('local', authCb)(req, res, next);

    function authCb(err, user) {
      if (err) {
        console.log(err);
        return next(err);
      }

      // if auth fails send back error
      if (!user) return res.status(401).json({
        status: 401,
        error: 'Invalid login credentials.'
      });

      req.user = user;
      next();
    }
  });
};
