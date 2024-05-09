import Stripe from 'stripe';
import paytmchecksum from '../paytm/PaytmChecksum.js';
import { paytmParams, paytmMerchantkey } from '../server.js';
import formidable from 'formidable';
import https from 'https';


import dotenv from 'dotenv';
dotenv.config(); //to initialise dotenv file
// const stripe =require('stripe')(process.env.STRIPE_SECRET);
import stripePackage from 'stripe';
const stripe = stripePackage(process.env.STRIPE_SECRET);


export const addPaymentGateway = async (request, response) => {
    const paytmCheckSum = await paytmchecksum.generateSignature(paytmParams, paytmMerchantkey);
    try {
        const params = {
            ...paytmParams,
            'CHECKSUMHASH': paytmCheckSum
        };
        response.json(params);
    } catch (error) {
        console.log(error);
    }
}

export const paymentResponse = (request, response) => {

    const form = new formidable.IncomingForm();
    const paytmCheckSum = request.body.CHECKSUMHASH;
    delete request.body.CHECKSUMHASH;

    const isVerifySignature = paytmchecksum.verifySignature(request.body, 'bKMfNxPPf_QdZppa', paytmCheckSum);
    if (isVerifySignature) {
        let paytmParams = {};
        paytmParams["MID"] = request.body.MID;
        paytmParams["ORDERID"] = request.body.ORDERID;

        paytmchecksum.generateSignature(paytmParams, 'bKMfNxPPf_QdZppa').then(function (checksum) {

            paytmParams["CHECKSUMHASH"] = checksum;

            const post_data = JSON.stringify(paytmParams);

            const options = {
                hostname: 'securegw-stage.paytm.in',
                port: 443,
                path: '/order/status',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': post_data.length
                }
            };

            let res = "";
            const post_req = https.request(options, function (post_res) {
                post_res.on('data', function (chunk) {
                    res += chunk;
                });

                post_res.on('end', function () {
                    let result = JSON.parse(res);
                    console.log(result);
                    response.redirect('http://localhost:8000')
                });
            });
            post_req.write(post_data);
            post_req.end();
        });
    } else {
        console.log("Checksum Mismatched");
    }
}

export const stripePayment=async(req,res)=>{
    const {products}=req.body;

    try{
    const lineItems=products.map((product)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:product.title.shortTitle,
                images:[product.url]
            },
            unit_amount:Math.round(product.price.cost*100),
        },
        quantity:"2"
        }
    ));

    const session=await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel"
    })
    res.json({id:session.id})
}catch(err){
    console.log('hii');
    console.log(err);
    res.status(500).json({message:"Error Creating Checkout Session"});
}

} 
