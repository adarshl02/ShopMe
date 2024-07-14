import User from "./Model/user-schema.js";
import localStrategy from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
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
        callbackURL: "/auth/google/callback", //3) handles data(authorised redirect uri)
        scope: ["profile", "email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
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

// Serialization: Determine what user data to store in the session
passport.serializeUser((user, done) => {
  if (user) {
      // If a user exists, store only the user's ID in the session
      // This minimizes the session size
      return done(null, user.id);
  } else {
      // If no user (e.g., failed login), store false
      return done(null, false);
  }
});

// Deserialization: Retrieve full user object from the stored session data
passport.deserializeUser(async (id, done) => {
  try {
      // Use the stored user ID to fetch the complete user object from the database
      const user = await User.findById(id);
      // Pass the full user object to the next middleware
      done(null, user);
  } catch (err) {
      // If an error occurs (e.g., database error), pass the error to the next middleware
      done(err, null);
  }
});

}