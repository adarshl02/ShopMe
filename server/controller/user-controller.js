import User from '../Model/user-schema.js';

export const userSignup=async(req,res)=>{     //req comes from frontend &response we are sending
    try{
         //console.log(req.body);
        // const exist=await User.findOne({username: req.body.username});
        //  if (exist) {
        //      return res.status(401).json({message:'Username already exist'});
        //  }
        const {firstname,lastname,username,email,phone,password}=req.body;
         const newUser=new User({firstname,lastname,username,email,phone,cart:[]});
         const registeredUser=await User.register(newUser,password);        //

        return res.status(200).json(registeredUser);   // (this is required response which we sending to frontend)

    }catch(error){
        return res.status(500).json({message:error.message});   //internal server error
    }
}

export const userLogin=async(req,res)=>{
    try{
        // const username=req.body.username;
        // const password=req.body.password;

        // let user=await User.findOne({username:username,password:password});
        if(req.flash('error').length>0){ 
            return res.status(500).json(null);
        }
        // if(user){
           
           return res.status(200).json(req.user);
        // }else{
        //     return res.status(401).json('Invalid login');
        // }

    }catch(error){
        res.status(500).json({'Error':error.message});
    }
}
export const userCart = async (req, res) => {
    try {
      let { cartItems, userId } = req.body;
      let user = await User.findByIdAndUpdate(userId, { cart: [] });                // Empty the cart array
      user.cart = cartItems;                                                 // Assign the new cartItems array
      await user.save();                                                     // Save the changes
      return res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ 'Error': error.message });
    }
  }
  

  