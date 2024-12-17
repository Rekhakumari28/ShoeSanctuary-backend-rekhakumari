const mongoose = require('mongoose')
const addressSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
        },
    street: {
        type: String,
        required: true
        },
    state:{
        type: String,
        required: true
        },
    country:{
        type: String,
        required: true
        },
    zipcode:{
        type: Number,
        required: true
        },
    mobileNo:{
        type: String,
        required: true
        },
})

const Address = mongoose.model("Address", addressSchema)
module.exports = Address