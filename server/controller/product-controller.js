
import Product from './../Model/product-schema.js';

export const getProducts=async(req,res)=>{
    try{
            const products =await Product.find({});
            res.status(200).json(products);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}


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

