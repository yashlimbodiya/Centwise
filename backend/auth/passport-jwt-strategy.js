import passport from 'passport';
import { Strategy as JWTStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import User from '../app/models/UserSchema.js';



const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'd21e85e70dccdae900ebad6692dac46ba8ef875e8e4bd490282f19cb0e8c5f5b91195170efdb2e23b9d84a800d1c54a59cfc5d53f75fe038a6661da9349eb137      ',
};

passport.use(
  new JWTStrategy(opts, (jwtPayload, done) => {
    User.findById(jwtPayload._id, (err, user) => {
      if (err) {
        console.error('Error occurred while processing JWT:', err);
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

export default passport;
