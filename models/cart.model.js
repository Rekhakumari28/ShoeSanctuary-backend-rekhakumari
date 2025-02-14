const mongoose = require("mongoose");

const orderItemSchem = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const cartSchema = new mongoose.Schema(
  {
    orderItems: [orderItemSchem],

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
    dateOrdered: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
