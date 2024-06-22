import express  from "express";
import {userSignup,userLogin, userCart, cartOrder} from "../controller/user-controller.js"
import { getProducts ,getProductById} from "../controller/product-controller.js";
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

router.get('/logout', isLoggedIn,(req, res) => {
    try {
        //This method is by 'passport'. it takes a callback with error parameter.
        // will remove req.user and remove user from session
        req.logout((err) => {
            if (err) {
                throw err
            }
            res.status(200).json("logged out")
        })
    } catch (error) {
        res.status(500).json(error)
    }

})

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
router.get('/auth/google',passport.authenticate('google',['profile','email']))

router.get('/auth/google/callback',passport.authenticate('google',{
    failureRedirect:process.env.URL,
    successRedirect:process.env.URL,
    })
)


router.post('/signup',userSignup);   //if get matched then execute to userSignup(backend api)
router.post('/login',passport.authenticate('local',{failureFlash:true}) ,userLogin);

router.post('/create-checkout-session',isLoggedIn,stripePayment);


router.put('/cart',userCart);
router.put('/cartToOrder',cartOrder);



export default router;



