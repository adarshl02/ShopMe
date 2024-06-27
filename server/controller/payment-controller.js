import Stripe from "stripe";

export const stripePayment = async (req, res) => {
  const { products } = req.body;

  try {
    const lineItems = products.map((product) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.title.shortTitle,
          images: [product.url],
        },
        unit_amount: Math.round(product.price.cost * 100),
      },
      quantity: product.quantity,
    }));
    // const URL='hosted url';
    console.log(products);
    const stripe = new Stripe(process.env.STRIPE_SECRET);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.URL}/myorders`,
      cancel_url: `${process.env.URL}/cancel`,
    });
    console.log(session);
    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ message: "Error Creating Checkout Session" });
  }
};
