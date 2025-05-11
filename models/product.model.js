const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    images: {
      type: String,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
    },
    size: 
      {
        type: String,
        enum: ["XS", "S", "M", "L", "XL"],
        default: "M"
      },
    
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    discount: {
      type: Number,
    },
   
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
