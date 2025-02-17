const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required : true,
        enum : ["Men", "Women", "Girls", "Boys"],       
      },
      product : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
},{timestamp: true})

const Category = mongoose.model("Category",categorySchema)
module.exports = Category