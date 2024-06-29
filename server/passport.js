import User from "./Model/user-schema.js";
import localStrategy from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";

// import dotenv from "dotenv";
// dotenv.config();

export default function passportFunction(){

  passport.use(new localStrategy(User.authenticate()));

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.URL}/api/auth/google/callback`, //3) handles data
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ googleId: profile.id });
          if (!user) {
            user = new User({
              googleId: profile.id,
              username: profile.displayName,
              email: profile.emails[0].value,
            });
            await user.save();
          }
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    if (user) {
      return done(null, user.id);
    } else {
      return done(null, false);
    }
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

}