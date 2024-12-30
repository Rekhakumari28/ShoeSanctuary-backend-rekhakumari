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
const OrderItem = mongoose.model("OrderItem", orderItemSchem);
module.exports = OrderItem;
