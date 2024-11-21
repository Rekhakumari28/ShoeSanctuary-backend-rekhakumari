const mongoose = require("mongoose")

const dataSchema = new mongoose.Schema({   
    author: {
        type: mongoose.Schema.Types.ObjectId ,
         ref: "Product"
        },

},{ timestamps: true })

const Data = mongoose.model("data",dataSchema)
module.exports = Data