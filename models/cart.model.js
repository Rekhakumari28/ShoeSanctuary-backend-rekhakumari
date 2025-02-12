const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    orderItems: 
     [ {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true,
      }],
    
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      default: "24/126, new adarsh colony, gulabpura, Rajasthan, India, 311021",
    },
   
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: "Rekha Kumari",
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
