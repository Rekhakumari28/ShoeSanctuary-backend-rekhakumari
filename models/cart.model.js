const mongoose = require('mongoose')

const orderItem = new mongoose.Schema({
   quantity: { type: Number, default: 1},
   product: { type: mongoose.Schema.Types.ObjectId, ref: "Product"}
})

const cartSchema = new mongoose.Schema({
   orderProduct:[ {  orderItem }],
   shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address" , default : "24/126, new adarsh colony, gulabpura, Rajasthan, India, 311021"},
   status: { 
      type: String,
      enum:["Pending","Delivered","Canceled"],
      default: "Pending"
   },
   totalPrice: {
      type: Number,
      required: true,
      default: 0
   },
   user : {type: mongoose.Schema.Types.ObjectId, ref: "User", default : "Rekha Kumari"}

},{timestamps: true})

const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart
