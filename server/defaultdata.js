//to add data to database from constant/data file

import { products } from "./constants/data.js"
import Product from "./Model/product-schema.js";
const DefaultData=async()=>{
    try{    
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log("Default data added");
    }catch(err){
        console.log('Error in Default Data: ', err.message);
    }
}

export  default DefaultData;
