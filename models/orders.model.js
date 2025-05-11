const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
 userId:{
  type: mongoose.Schema.Types.ObjectId,
   ref: "User", 
   required: true
 }, 
 products:[
  {     
     productId: { type: Number, required: true },
      title: { type: String, required: true },

      price: { type: Number, required: true },

      quantity: { type: Number, default: 1 },
      images: [{ type: String }],
      addedAt: { type: Date, default: Date.now },
  
  }
 ],
 totalAmount: { type: Number, required: true },
 orderDate: { type: Date, default: Date.now },
  
  
});
const Order= mongoose.model("Order", orderSchema);
module.exports = Order