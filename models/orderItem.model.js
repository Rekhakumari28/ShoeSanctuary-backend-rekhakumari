const mongoose = require("mongoose");
const orderItemSchem = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  product:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
});
const OrderItem = mongoose.model("OrderItem", orderItemSchem);
module.exports = OrderItem;
