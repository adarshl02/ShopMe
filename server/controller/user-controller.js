import User from '../Model/user-schema.js';

export const userSignup = async (req, res) => {
    try {
        const { firstname, lastname, username, email, phone, password } = req.body;

        // Create a new user instance
        const newUser = new User({ firstname, lastname, username, email, phone });

        // Register the user
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
      let { cartItems, userId } = req.body;
      let user = await User.findByIdAndUpdate(userId, { cart: [] },{runValidators:true} );                // Empty the cart array
      user.cart = cartItems;                                                 // Assign the new cartItems array
      await user.save();                                                     // Save the changes
      return res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ 'Error': error.message });
    }
  }

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
  

  