import mongoose from "mongoose";

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
    password:{
        type:String,
        required:true,
        trim:true,
    },
    phone:{
        type: Number,
        required:true,
    }   
});

const User=mongoose.model('user',userSchema);  // created a collection 'Users' with userschema

export default  User; 