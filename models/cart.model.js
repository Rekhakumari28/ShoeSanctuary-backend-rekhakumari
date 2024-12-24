const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
   orderItem: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "OrderItem",
            required: true,
          }],
   shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
   status: { 
      type: String,
      enum:["Pending","Delivered","Canceled"],
      default: "Pending"
   },
   totalPrice: {
      type: Number,
      required: true
   },
   user : {type: mongoose.Schema.Types.ObjectId, ref: "User"}

},{timestamps: true})

const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart



// orderItemsSchem { product, quantity }
// inside orderSchema we can use orderItemsSchema like this
// orderSchema{ orderItems: [orderItemsSchem] }
//this is array of orderItemsSchem.