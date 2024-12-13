const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    User: {
            type: mongoose.Schema.Types.ObjectId ,
            ref: "User"
               },
    Product:[{
            Product: [{
            type: mongoose.Schema.ObjectId,
            ref: "Product"
             }],
       
            quantity:{
            type: Number,
            required: true,
            min :1,
            default:1,       
            },
            price:Number
    }],
    bill:{
        type: Number,
        default: 0,
    }   

},{timestamps: true})

const Cart = mongoose.model("Cart", cartSchema)
module.exports = Cart