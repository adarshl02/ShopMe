//to add data to database from constant/data file
import csv from "csv-parser";
import fs from "fs";
import { products } from "./constants/data.js";
import Product from "./Model/product-schema.js";



const DefaultData = async () => {
  const results = [];

  await Product.deleteMany({});
  await Product.insertMany(products);

  // Read the CSV file
  fs.createReadStream("similar_products.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      for (const row of results) {
        const productId = row.product_id;
        const similarIds = [
          row.similar_1,
          row.similar_2,
          row.similar_3,
          row.similar_4,
        ];

        try {
          await Product.findOneAndUpdate(
            { id: productId },
            { $set: { similarProductIds: similarIds } },
            { new: true }
          );
        } catch (error) {
          console.error(`Error in reading from csv file`, error);
        }
      }

      console.log("Finished updating products");
    });
};

export default DefaultData;
