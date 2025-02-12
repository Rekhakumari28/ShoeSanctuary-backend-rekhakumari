const asyncHandler = require('express-async-handler')

const Cart = require('../models/cart.model')


//add cart
async function createCart(newCart){
    try {
        const cart = new Cart(newCart)
        const savedCart = await cart.save()
        return savedCart
    } catch (error) {
    console.log("An error occured while creating cart.", error)        
    }
}
 
const addToCart = asyncHandler(async(req, res)=>{
    try {
        const cart = await createCart(req.body)
        res.json(cart)
    } catch (error) {
        res.status(500).json({error: "No order items."})
    }
})

//find all data
async function findAllCart(){
    try {
        const cart = await Cart.find().populate("orderItem").populate("shippingAddress").populate('user')
        return cart
    } catch (error) {
        console.log(error)
    }
}

const getAllCart = asyncHandler(async(req,res)=>{
    try {
        const cart = await findAllCart()
        if(cart.length != 0){
            res.json(cart)
        }else{
            res.status(404).json({error: "No cart found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch cart."})
    }
})

//find by user

async function findCartByUser (user){
    try {
        const cart = await Cart.findOne({user : user}).populate("orderItems").populate("shippingAddress").populate('user')
        return cart
    } catch (error) {
        console.log('An error occured finding user cart.', error)   
    }
}

const getCartByUser = asyncHandler (async (req, res)=>{
    try {
        const cart = await findCartByUser(req.params.user)
        if(cart){
            res.json(cart)
        }else{
            res.status(404).json({error: "User's cart not found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch user cart."})       
    }
})

//delete cart
async function deleteCart(cartId){
    try {
        const deletedCart = await Cart.findByIdAndDelete(cartId) 
        return deletedCart
    } catch (error) {
       console.log(error) 
    }
}

const removeCart = asyncHandler( async (req,res)=>{
    try {
        const deletedCart = await deleteCart(req.params.cartId)
        if(deletedCart){
            res.status(200).json({message: "cart Deleted Successfully."})
        }else{
            res.status(404).json({error: "cart not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete cart."})
    }
})



module.exports = {addToCart, getAllCart , getCartByUser, removeCart}