import User from '../Model/user-schema.js';

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
        return res.status(200).json();
    }catch(error){
        res.status(500).json({ 'Error': error.message });
    }
}
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero indexed
    const year = date.getFullYear();

    return `${day}, ${month}, ${year}`;
}
  

  