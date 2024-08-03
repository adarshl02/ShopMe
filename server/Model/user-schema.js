import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema=new mongoose.Schema({
    googleId: {
        type: String,
        unique: false ,
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
        index:true,   //When you set index: true for a field, MongoDB will create an index on that field.
        //This tells MongoDB that this field will be frequently used in queries.
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