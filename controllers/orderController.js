const mongoose = require("mongoose");
const Product = require("../models/product.model.js");
const Order = require("../models/orders.model.js");
const Cart = require("../models/cart.model.js");

//place Order
exports.placeOrder = async (req, res) => {
  try {
    const { cartItems, totalAmount, shippingAddress } = req.body;
    const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }   

    const order = new Order({
    cartItems,
      totalAmount,
      shippingAddress
    });

    const savedOrder = await order.save()       

    res.status(201).json({ message: "Order placed successfully.", savedOrder });
    await Cart.updateOne({ userId }, { $set: { products: [] } });

  } catch (error) {
    res.status(500).json({ error: "Failed to place order." });
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const orders = await Order.find({ userId })
      .sort({ orderDate: -1 })
      .populate("cartItems");

    if (!orders.length) {
      return res.status(404).json({ error: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    res
      .status(500)
      .json({
        error: "An error occurred while fetching order history.",
        error,
      });
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId, userId } = req.params;

    console.log(`Request received for order ${orderId}, user ${userId}`);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error("Invalid user ID:", userId);
      return res.status(400).json({ error: "Invalid user ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      console.error("Invalid order ID:", orderId);
      return res.status(400).json({ error: "Invalid order ID" });
    }

    const order = await Order.findOne({
      _id: orderId,
      userId,
    }).populate("cartItems")

    console.log("Found order:", order);

    if (!order) {
      console.error("Order not found");
      return res.status(404).json({ error: "Order not found for this user" });
    }

    const productsWithDetails = await Promise.all(
      order.products.map(async (product) => {
        const productDetails = await Product.findOne({
          productId: product.productId,
        });
        console.log(`Product ${product.productId} details:`, productDetails);
        return {
          ...product.toObject(),
          productDetails,
        };
      })
    );

    order.products = productsWithDetails;
    res.status(200).json(order);
  } catch (error) {
    console.error("Error in getOrderDetails:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      stack: error.stack,
    });
  }
};
