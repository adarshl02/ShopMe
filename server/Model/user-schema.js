import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
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
        required:true,
    } ,
    cart:{
        type:Array
    }  
});

userSchema.plugin(passportLocalMongoose);

const User=mongoose.model('user',userSchema);  // created a collection 'Users' with userschema

export default  User; 