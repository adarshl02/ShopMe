import { connectRedis } from '../config/redis.config.js';
import Product from './../Model/product-schema.js';

let redisConnectionClient;

(async () => {                                            //imediately invoked function
  redisConnectionClient = await connectRedis();
})();

export const getProducts = async (req, res) => {
  try {
    
    // Check if data is already cached in Redis
    const cachedData = await redisConnectionClient.get('products');
    if (cachedData) {
      console.log('Data fetched from Redis');
      const products = JSON.parse(cachedData);
      return res.status(200).json(products);
    }

    console.log("Data fetched from MongoDB");
    const products = await Product.find({});

    // Store data in Redis (serialize to JSON string)
    await redisClient.set('products', JSON.stringify(products), {
      EX: 3600 // Optional: set expiration to 1 hour
    });
    console.log("Data set in redis");

    res.status(200).json(products);
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ message: error.message });
  }
};


export const getProductById=async(req,res)=>{
    try{
        const id=req.params.id;
        const product=await Product.findOne({'id':id})

        res.status(200).json(product);

    }catch(error){
        res.status(500).json({message:error.message});
    }
} 

export const setNewRating = async (req, res) => {
    try {
      const { ItemId, newValue } = req.body;
  
      const product = await Product.findOne({ id: ItemId });
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      let newRating;
      if (product.rating === 0) {
        newRating = newValue;
      } else {
        newRating = (product.rating + newValue) / 2;
      }
  
      const newProduct = await Product.findOneAndUpdate(
        { id: ItemId },
        { 
          $set: {
            rating: newRating,
            ratingCount: product.ratingCount + 1
          }
        },
        { new: true }
      );
  
      res.status(200).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

