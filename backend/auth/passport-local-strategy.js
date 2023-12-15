import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../app/models/UserSchema.js'; 


passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email: email });
        if (!user || password !== user.password) {
          req.flash('error', 'Invalid Username/Password');
          return done(null, false);
        }
        return done(null, user);
      } catch (err) {
        req.flash('error', err.message);
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      console.error('Error while finding user:', err);
      return done(err);
    }
    return done(null, user);
  });
});

// Check if user is authenticated
export const checkAuthentication = (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      return res.redirect('/user/signin');
    };
    
export const setAuthenticatedUser = (req, res, next) => {
      if (req.isAuthenticated()) {
            // req.user contains the current signed-in user from the cookie
            // and we are sending this to the locals for the views
        res.locals.user = req.user;
      }
      next();
};

export default passport;
