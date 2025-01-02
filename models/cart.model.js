const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    orderItem: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true,
      },
    ],
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      default: "24/126, new adarsh colony, gulabpura, Rajasthan, India, 311021",
    },
    status: {
      type: String,
      enum: ["Pending", "Delivered", "Canceled"],
      default: "Pending",
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
