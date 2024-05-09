import express  from "express";
import {userSignup,userLogin} from "../controller/user-controller.js"
import { getProducts ,getProductById} from "../controller/product-controller.js";
import { addPaymentGateway, paymentResponse, stripePayment} from "../controller/payment-controller.js";

const router=express.Router();

router.post('/signup',userSignup);   //if get matched then execute to userSignup(backend api)
router.post('/login',userLogin);

router.get('/products',getProducts);    //for getting all products
//6_07
router.get('/product/:id',getProductById);

router.post('/payment',addPaymentGateway);
router.post('/callback',paymentResponse);

router.post('/create-checkout-session',stripePayment);

export default router;



