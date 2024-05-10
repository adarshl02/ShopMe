import express from "express";
import Connection from "./database/db.js"; // where connection function lies (to connect database)
import dotenv from "dotenv";
import DefaultData from "./defaultdata.js";
import Router from "./routes/route.js";
import cors from "cors"; //allowing cross-origin-resource sharing
import bodyParser from "body-parser"; // to get req.body comung from post api (not undefined) in a readable format
import { v4 as uuid } from "uuid"; //for generating unique id for user
import path from 'path';
import { fileURLToPath } from "url";


const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename); 


const app = express();
dotenv.config(); //to initialise dotenv file
app.use(cors()); //so that localhost 8000 and 3000 both works
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true })); //to remove whitespace in url(can ignore)


app.use(express.static(process.env.PUBLIC_DIR));

app.use("/api", Router); //routes to api to localhost:8000/
// app.use('*',(req,res)=>{
//   res.sendFile(path.resolve(__dirname,'build','index.html'));
// })
 app.use('*',(req,res)=>{
   res.sendFile(path.resolve(__dirname,'build','index.html'));
 })


const PORT=process.env.PORT || 8000;

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL=process.env.MONGODB_URL||`mongodb+srv://${USERNAME}:${PASSWORD}@flipkart.rpsveoc.mongodb.net/?retryWrites=true&w=majority&appName=FlipKart`;



Connection(URL); //database connected successfully

if(process.env.NODE_ENV==='production'){      //heroku
    app.use(express.static('client/build'));
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//DefaultData();               //default data added successfully
//if not used await inside this , this will execute first before Server is lisenig to 8000

//to run server , write nodemon index.js

export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
export let paytmParams = {};
paytmParams["MID"] = process.env.PAYTM_MID;
paytmParams["WEBSITE"] = process.env.PAYTM_WEBSITE;
paytmParams["CHANNEL_ID"] = process.env.PAYTM_CHANNEL_ID;
paytmParams["INDUSTRY_TYPE_ID"] = process.env.PAYTM_INDUSTRY_TYPE_ID;
paytmParams["CUST_ID"] = process.env.PAYTM_CUST_ID;
paytmParams["ORDER_ID"] = uuid();
paytmParams["TXN_AMOUNT"] = "100";
paytmParams["CALLBACK_URL"] = "/api/callback"; //apiOpens
paytmParams["EMAIL"] = "adarsh@gmail.com";
paytmParams["MOBILE_NO"] = "1243546423";


//installing uuid for this