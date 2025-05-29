const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
 cartItems:{
  type: mongoose.Schema.Types.ObjectId,
   ref: "Cart", 
 },
 totalAmount: { type: Number, required: true },
 orderDate: { type: Date, default: Date.now },
  shippingAddress:{ type: mongoose.Schema.Types.ObjectId,  ref: "Address",  }
  
});
const Order= mongoose.model("Order", orderSchema);
module.exports = Order