import mongoose from "mongoose";

const productSchema=new mongoose.Schema({           // this is schema created at database
    id:{
        type:String,
        required:true,
        unique:true
    },
    url:String,
    detailUrl:String,
    title:Object,
    price:Object,
    quantity:Number,
    description:String,
    discount:String,
    tagline:String
});
                              //becomes 'Products' collection
const Product=mongoose.model("product",productSchema); // a collection in ProductSchema database
//this Product object can be used manipulate collection like Product.insertMany or Product.deleteMan

export default Product;