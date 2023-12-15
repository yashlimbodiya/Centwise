import passport from 'passport';
import { OAuth2Strategy as googleStrategy } from 'passport-google-oauth';
import crypto from 'crypto';
import User from '../app/models/UserSchema.js';

passport.use(
      new googleStrategy(
        {
          clientID: '1001973337331-mhj8i3u7gqjue1h2j565opegbj9chupq.apps.googleusercontent.com',
          clientSecret: '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',
          callbackURL: 'http://localhost:5173/api/user/auth/google/callback',
        },
        function (accessToken, refreshToken, profile, done) {
          // Check if profile.emails is defined before accessing it
          //console.log("reached in google oauth");
          //console.log("PROFILE: " + profile.json());
          if (profile.emails && profile.emails.length > 0) {
            User.findOne({ email: profile.emails[0].value }).exec(function (err, user) {
              if (err) {
                console.log('error in google strategy passport', err);
                return done(err);
              }
              //console.log(profile);
              if (user) {
                return done(null, user);
              } else {
                return User.create(
                  {
                    first_name: profile.name.givenName,
                    last_name: profile.name.familyName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex'),
                    ph_no: Math.floor((Math.random() * (10000000000 - 1)) + 1),
                  },
                  function (err, newUser) {
                    if (err) {
                      console.log('error in creating user', err);
                      return done(err);
                    }
                    return done(null, newUser);
                  }
                );
              }
            });
          } else {
            // Handle the case where profile.emails is undefined or empty
            return done(new Error('Email not found in the Google profile'), null);
          }
        }
      )
    );

export default passport;