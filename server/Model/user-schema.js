import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema=new mongoose.Schema({
    googleId: {
        type: String,
       
    },
    firstname:{
        type:String,
        
    },
    lastname:{
        type:String,
       
    },
    username:{
        type : String,
         required:true,
        trim:true,
        index:true,   //mongodb indexing laga de
    },
    email:{
        type:String,
        required:true,
        trim:true,
        index:true,
    },
    phone:{
        type: Number,
    } ,
    cart:{
        type:Array
    } ,
    orders:{
        type:Array
    } 
});

userSchema.plugin(passportLocalMongoose);

const User=mongoose.model('user',userSchema);  // created a collection 'Users' with userschema

export default  User; 