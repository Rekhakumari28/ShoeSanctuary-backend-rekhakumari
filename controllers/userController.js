const asyncHandler = require('express-async-handler')

const User = require('../models/user.model')

//add user
async function createUser(newUser){
    try {
        const user = new User(newUser)
        const savedUser = await user.save()
        return savedUser
    } catch (error) {
    console.log("An error occcured while creating user data.", error)        
    }
}

const addNewUser = asyncHandler(async(req, res)=>{
    try {
        const user = await createUser(req.body)
        res.json(user)  
    } catch (error) {
        res.status(500).json({error: "user not created."})
    }
})



//find all user
async function findAllUser(){
    try {
        const user = await User.find().populate("address")
        return user
    } catch (error) {
        console.log(error)
    }
}

const getAllUser = asyncHandler(async(req,res)=>{
    try {
        const user = await findAllUser()
        if(user.length != 0){
            res.json(user)
        }else{
            res.status(404).json({error: "No user found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch user."})
    }
})

//find by Id 

async function findUserByEmail (email){
    try {
        const user = await User.findOne({email: email}).populate("address")
        return user
    } catch (error) {
        console.log("An error occured when finding user.", error)
    }
}

const getUserByEmail = asyncHandler( async (req, res)=>{
    try {
        const user = await findUserByEmail(req.params.email)
        if(user){
            res.json(user)
        }else{
            res.status(404).json({error: "User not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch user."})
    }
})

module.exports = {addNewUser, getAllUser, getUserByEmail}