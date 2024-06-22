 //to initialise dotenv file
// const stripe =require('stripe')(process.env.STRIPE_SECRET);



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
        quantity:"1"
        }
    ));
    // const URL='hosted url';
        const session=await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",
            success_url:`${process.env.URL}/myorders`,
            cancel_url:`${process.env.URL}/cancel`
        })
        res.json({id:session.id})
}catch(err){
    res.status(500).json({message:"Error Creating Checkout Session"});
}

} 
