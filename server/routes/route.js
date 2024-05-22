import express  from "express";
import {userSignup,userLogin, userCart} from "../controller/user-controller.js"
import { getProducts ,getProductById} from "../controller/product-controller.js";
import { stripePayment} from "../controller/payment-controller.js";
import passport from "passport";

const router=express.Router();

router.post('/signup',userSignup);   //if get matched then execute to userSignup(backend api)
router.post('/login',passport.authenticate('local',{failureFlash:true}) ,userLogin);
    
router.get('/products',getProducts);    //for getting all products
//6_07
router.get('/product/:id',getProductById);


router.post('/create-checkout-session',stripePayment);
router.put('/cart',userCart);

export default router;



