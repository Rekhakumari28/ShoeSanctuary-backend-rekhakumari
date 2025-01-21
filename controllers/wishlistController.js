const asyncHandler = require('express-async-handler')

const Wishlist = require('../models/wishlist.model')

//add to wishlist 
async function addProductToWishlist (newProduct){
    try {
        const wishlist = new Wishlist(newProduct)
        const savedWishlist = await wishlist.save()
        return savedWishlist
    } catch (error) {
        console.log('An error occured while adding product.', error)        
    }
}

const addToWishlist = asyncHandler(async (req, res)=>{
    try {
        const wishlist = await addProductToWishlist(req.body)
        res.status(201).json({message: 'Product added to wishlist.', wishlist: wishlist})
    } catch (error) {
        res.status(500).json({error: "Failed to add product."})
    }
})

//get wishlist
async function getWishlistProduct(){
    try {
        const wishlist = await Wishlist.find().populate("category")
        return wishlist
    } catch (error) {
        console.log("An error occured fetching products.")        
    }
}

const getWishlist = asyncHandler( async (req,res)=>{
    try {
        const wishlist = await getWishlistProduct()
        if(wishlist.length !=0){
            res.json(wishlist)
        }else{
            res.status(404).json({error: "No product found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch products."})  
    }
})

//delete product
async function deleteProductFromWishlist(productId){
    try {
        const deletedProduct = await Wishlist.findByIdAndDelete(productId) 
        return deletedProduct
    } catch (error) {
       console.log(error) 
    }
}

const deleteFromWishlist = asyncHandler( async (req,res)=>{
    try {
        const deletedProduct = await deleteProductFromWishlist(req.params.productId)
        if(deletedProduct){
            res.status(200).json({message: "Product Deleted Successfully."})
        }else{
            res.status(404).json({error: "Product not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete Product."})
    }
})

module.exports = {addToWishlist, getWishlist, deleteFromWishlist}