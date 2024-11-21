const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required : true,
        enum : ["Men", "Women", "Girls", "Boys"]
      }
},{timestamp: true})

const Category = mongoose.model("Category",categorySchema)
module.exports = Category