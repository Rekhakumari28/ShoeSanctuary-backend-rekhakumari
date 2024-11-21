const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
      },
    price :{
        type: Number,
        default: 0
      },
    images : {
        type: String
      },
    
    rating: {
        type: Number,
        min:0, 
        max:5
    },
    size :[ {
        type: String,
        enum: ["XS" ,"S", "M", "L", "XL"]
    }],
    author: {
      type: mongoose.Schema.Types.ObjectId ,
       ref: "Category"
      },
      
    discount :String,
    shorDetail: String,
    description: String,
    
},{ timestamps: true } )

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product