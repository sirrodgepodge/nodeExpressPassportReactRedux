import passport from 'passport';
import { signupMiddleWare } from '../signup';


export default api => {
  // A POST /login route is created to handle login.
  api.post('/login', (req, res, next) => {
    // handles authentication, have to deal with restful response in callback
    passport.authenticate('local', authCb)(req, res, next);

    function authCb(err, user) {
      if (err) {
        console.log(err);
        return next(err);
      }

      // if auth fails we sign the user up, not something you'd do in a real app! You might instead use something like the commented out code below
      if (!user) {
        // return res.status(401).json({
        //   status: 401,
        //   error: 'Invalid login credentials.'
        // });

        return signupMiddleWare(req, res, next);
      }

      // if username and password was correct
      req.user = user;

      next();
    }
  });
};
