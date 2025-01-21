const mongoose = require('mongoose')
const wishlistSchema = new mongoose.Schema({
    
   title: {
         type: String,
         required: true,
       },
       price: {
         type: Number,
         default: 0,
       },
       images: {
         type: String,
       },
       rating: {
         type: Number,
         min: 0,
         max: 5,
       },
       size: [
         {
           type: String,
           enum: ["XS", "S", "M", "L", "XL"],
         },
       ],
       category: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Category",
       },
       discount: {
         type: String,
       },
       shorDetail: {
         type: String,
       },
       description: {
         type: String,
       },
  })

const Wishlist = mongoose.model('Wishlist', wishlistSchema)
module.exports = Wishlist