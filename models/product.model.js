const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({     
          title: {
            type: String,
            required: true
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
          discount : {
            type: String
          },
          shorDetail:  {
            type: String
          },
          description:  {
            type: String
          }, 
      
 },{ timestamps: true } )

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product