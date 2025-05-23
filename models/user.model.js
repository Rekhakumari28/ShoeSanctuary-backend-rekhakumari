const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        require: true ,        
    },
    email:{
        type:String,
        require: true,
        lowercase: true,
    },
    password: {
        type:String,
        require: true
    }
   
    
},{timestamp: true})

const User = mongoose.model("User",userSchema)
module.exports = User