import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Connection from "./database/db.js"; // where connection function lies (to connect database)
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
import flash from "express-flash";
import ExpressMongoSanitize from "express-mongo-sanitize";
import passportFunction from './passport.js'
const app = express();

// app.use(helmet())
//
// app.use(ExpressMongoSanitize());  //data sanitization against malfunctioned data injection




app.use(cors({
  credentials: true
}));//so that localhost 8000 and 3000 both works
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
    secure: false,
  },
};

app.use(flash());
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

passportFunction()

app.use("/api", Router);
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);  //2)

app.get('/auth/google/callback',passport.authenticate('google',{    //4) final
  successRedirect:process.env.URL,
  failureRedirect:process.env.URL,
  })
)
app.use(express.static(process.env.PUBLIC_DIR));

const PORT = process.env.PORT || 8000;


 if(process.env.NODE_ENV==='production'){
   app.use('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'build','index.html'));
})
 }

// DefaultData();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


