import express from "express";
import Connection from "./database/db.js"; // where connection function lies (to connect database)
import dotenv from "dotenv";
import DefaultData from "./defaultdata.js";
import helmet from "helmet";
import Router from "./routes/route.js";
import cors from "cors"; //allowing cross-origin-resource sharing
import bodyParser from "body-parser"; // to get req.body comung from post api (not undefined) in a readable format
import { v4 as uuid } from "uuid"; //for generating unique id for user
import path from "path";
import { fileURLToPath } from "url";
import session, { Cookie } from "express-session";
import MongoStore from "connect-mongo"; //for storing session in database
import passport from "passport";
import localStrategy from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "./Model/user-schema.js";
import flash from "express-flash";
import ExpressMongoSanitize from "express-mongo-sanitize";

const app = express();

// app.use(helmet())
//
// app.use(ExpressMongoSanitize());  //data sanitization against malfunctioned data injection

dotenv.config(); //to initialise dotenv file
app.use(
  cors()
  // {
  //   credentials:true
  // }
); //so that localhost 8000 and 3000 both works
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); //to remove whitespace in url(can ignore)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const URL = process.env.MONGODB_URL;
Connection(URL); //database connected successfully

const store = MongoStore.create({
  //connect-mongo
  mongoUrl: URL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, //in seconds (1 day)
});

store.on("error", () => {
  console.log("session store error");
});

const sessionOptions = {
  //express-session
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 24 * 60 * 60 * 1000,
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(flash());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback", //same as athorized url
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

app.use(express.static(process.env.PUBLIC_DIR));
app.use("/api", Router);
//routes to api to localhost:8000/

const PORT = process.env.PORT || 8000;

app.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

//  if(process.env.NODE_ENV==='production'){
//    app.use('*',(req,res)=>{
//   res.sendFile(path.resolve(__dirname,'build','index.html'));
// })
//  }

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// DefaultData();               //default data added successfully
//if not used await inside this , this will execute first before Server is lisenig to 8000

//to run server , write nodemon index.js
