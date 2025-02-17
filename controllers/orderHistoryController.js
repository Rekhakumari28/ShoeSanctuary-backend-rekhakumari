const asyncHandler = require('express-async-handler')

const OrderHistory = require('../models/orderHistory.model')


//add cart
async function createOrderHistory(newCartHistory){
    try {
        const cartHistory = new OrderHistory(newCartHistory)
        const savedCartHistory = await cartHistory.save()
        return savedCartHistory
    } catch (error) {
    console.log("An error occured while creating cart history.", error)        
    }
}
 
const addToCartHistory = asyncHandler(async(req, res)=>{
    try {
        const cartHistory = await createOrderHistory(req.body)
        res.json(cartHistory)
    } catch (error) {
        res.status(500).json({error: "No order items."})
    }
})


//find all data
async function findAllCartHistory(){
    try {
        const cartHistory = await OrderHistory.find().populate("orderItems.product").populate("shippingAddress").populate('user').exec()
       
        return cartHistory
    } catch (error) {
        console.log(error)  
    }
}

const getAllCartHistory = asyncHandler(async(req,res)=>{
    try {
        const cartHistory = await findAllCartHistory()
        if(cartHistory.length != 0){
            res.json(cartHistory)
        }else{
            res.status(404).json({error: "No cart History found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch cart History."})
    }
})

//find by user

async function findCartHistoryByUser (email){
    try {
        const cartHistory = await OrderHistory.findOne({email : email}).populate("orderItems.product" ).populate("shippingAddress").populate('user').exec()
       
        return cartHistory
    } catch (error) {
        console.log('An error occured finding user cart History.', error)   
    }
}

const getCartHistoryByUser = asyncHandler (async (req, res)=>{
    try {
        const cartHistory = await findCartHistoryByUser(req.params.user)
        if(cartHistory){
            res.json(cartHistory)
        }else{
            res.status(404).json({error: "User's cart history not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch user cart history."})       
    }
})

//find cart history by Id

async function findCartHistoryById(cartHistoryId){
    try {
        const cartHistory = await OrderHistory.findById(cartHistoryId).populate("orderItems.product" ).populate("shippingAddress").populate('user').exec()
        return cartHistory
    } catch (error) {
        console.log(error)
    }
}

const getCartHistoryById = asyncHandler(async (req, res)=>{
    try {
        const cartHistory = await findCartHistoryById(req.params.cartHistoryId)
        if(cartHistory.length != 0){
            res.json(cartHistory)
        }else{
            res.status(404).json({error: "No cart history found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch cart history."})
    }
})



//delete cart History
async function deleteCartHistory(cartHistoryId){
    try {
        const deletedCartHistory = await OrderHistory.findByIdAndDelete(cartHistoryId) 
        return deletedCartHistory
    } catch (error) {
       console.log(error) 
    }
}

const removeCartHistory = asyncHandler( async (req,res)=>{
    try {
        const deletedCartHistory = await deleteCartHistory(req.params.cartHistoryId)
        if(deletedCartHistory){
            res.status(200).json({message: "Cart History Deleted Successfully."})
        }else{
            res.status(404).json({error: "cart history not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete cart history."})
    }
})

module.exports = {addToCartHistory, getAllCartHistory , getCartHistoryByUser, getCartHistoryById, removeCartHistory}