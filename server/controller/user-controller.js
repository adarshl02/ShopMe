import dotenv from "dotenv";
dotenv.config();

import { invoiceTemplate } from '../constants/invoiceTemplate.js';
import User from '../Model/user-schema.js';
import nodemailer from 'nodemailer'


export const userSignup = async (req, res) => {
    try {
        const { firstname, lastname, username, email, phone, password } = req.body;
        
        const newUser = new User({ firstname, lastname, username, email, phone,cart:[],orders:[] });
        
        const registeredUser = await User.register(newUser, password);
        // Automatically log in the user after registration
        req.login(registeredUser, (err) => {
            if (err) {
                return res.status(500).json({ message: "Login after signup failed." });
            }
            return res.status(200).json(registeredUser);
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const userLogin=async(req,res)=>{
    try{
        if(req.flash('error').length>0){ 
            return res.status(500).json(null);
        }     
        console.log(req.user)     
           return res.status(200).json(req.user);


    }catch(error){
        res.status(500).json({'Error':error.message});
    }
}

export const userCart = async (req, res) => {
    try {
      const { cartItems, userId } = req.body;
  
      // Check if cartItems and userId are provided
      if (!cartItems || !userId) {
        return res.status(400).json({ 'Error': 'Missing cartItems or userId' });
      }
  
      // Find the user and update the cart in one step
      const user = await User.findByIdAndUpdate(
        userId,
        { cart: cartItems },
        { new: true, useFindAndModify: false } // Return the updated document
      );
  
      // Check if user was found and updated
      if (!user) {
        return res.status(404).json({ 'Error': 'User not found' });
      }
  
      return res.status(200).json(user.cart);
    } catch (error) {
      return res.status(500).json({ 'Error': error.message });
    }
  };

  //Email
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "adarshl10604@gmail.com",
      pass: process.env.MAIL_PASSWORD,
    },
  });

export const cartOrder=async (req,res)=>{
    try{

        let {userId,cartItems}=req.body;
        
        const itemsWithOrderDate = cartItems.map(item => ({
            ...item,
            orderDate: formatDate(Date.now())  // Adding orderDate as Date.now()
        }));

        let user = await User.findByIdAndUpdate(userId, { $push:{ orders: {$each:itemsWithOrderDate}} },{runValidators:true});

        user.cart=[];
        await user.save(); 
        const { email} = req.user;
       
        const info = await transporter.sendMail({
            from: '"Ecommerce : ShopMe" <order@gmail.com>', // sender address
            to: email, // list of receivers
            subject: 'Order Received', // Subject line
            text: "Hello world?", // plain text body
            html: invoiceTemplate(cartItems), // html body
          });
          return res.status(200).json({ message: 'Order processed successfully' });
    }catch(error){
        return res.status(500).json({ 'Error': error.message });
    }
}
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}
  

  