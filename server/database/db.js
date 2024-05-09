import mongoose from "mongoose";

export const Connection=async (URL)=>{
    try{
        // {useUnifiedTopology:true,useNewUrlParser:true}
        await mongoose.connect(URL);
        console.log("Database connected Successfully");
    }catch(err){
        console.log('Error while connecting with database',err.message);
    }
}

export default Connection;