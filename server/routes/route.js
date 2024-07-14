import express  from "express";
import {userSignup,userLogin, userCart, cartOrder} from "../controller/user-controller.js"
import { getProducts ,getProductById, setNewRating} from "../controller/product-controller.js";
import { stripePayment} from "../controller/payment-controller.js";
import passport from "passport";
import { isLoggedIn } from "../middleware/userMiddleware.js";

const router=express.Router();

router.get('/products',getProducts);    //for getting all products
//6_07
router.get('/product/:id',getProductById);
router.get('/profile' ,isLoggedIn ,(req , res)=>{
    res.json(req.user)
})

router.get('/orders',isLoggedIn ,(req,res)=>{
    res.json(req.user);
})

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: "Error during logout" });
        }
        
        req.session.destroy((destroyErr) => {
            if (destroyErr) {
                return res.status(500).json({ error: "Error destroying session" });
            }
            res.clearCookie('connect.sid'); // Clear the session cookie
            res.status(200).json({ message: "Logged out successfully" });
        });
    });
});

router.get('/login/failed',(req,res)=>{
    res.status(401).json({
        error:true,
        message:"login failure",
    })
})
router.get('/login/success',(req,res)=>{
    if(req.user){
        res.status(200).json({
            error:false,
            message:"Successfully logged in",
            user:req.user,
        })
    }else{
        res.status(403).json({
            error:true,
            message:"Unauthorised",
            })
    }
});
// router.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] })
//   );  //2)
// 
// router.get('/auth/google/callback',passport.authenticate('google',{    //4) final
//     successRedirect:process.env.URL,
//     failureRedirect:process.env.URL,
//     })
// )


router.post('/signup',userSignup);   //if get matched then execute to userSignup(backend api)
router.post('/login',passport.authenticate('local',{failureFlash:true}) ,userLogin);

router.post('/ratings',isLoggedIn,setNewRating)
router.post('/create-checkout-session',isLoggedIn,stripePayment);


router.put('/cart',userCart);
router.post('/cartToOrder',cartOrder);

// router.post('/recommend',recommendProduct);

export default router;



