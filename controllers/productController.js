const asyncHandler  = require('express-async-handler')

//import model
const Product = require('../models/product.model')

 //add product
async function addProducts(newProduct){
    try {
        const product = new Product(newProduct)        
        const savedProduct = await product.save()
        return savedProduct
    } catch (error) {
        console.log(error)
    }
}
const addProduct = asyncHandler(async (req,res)=>{ 

    try {
        const products = await addProducts(req.body)
        res.status(201).json({message: "Product added successfully.", product:products})
    }catch(error){
        res.status(500).json({error: "Failed to add product."})
        
    }
})


//find product by Id

async function findProductById(productId){
    try {
        const products = await Product.findById(productId).populate("category")
        return products
    } catch (error) {
        console.log(error)
    }
}

const getProductById = asyncHandler(async (req, res)=>{
    try {
        const products = await findProductById(req.params.productId)
        if(products.length != 0){
            res.json(products)
        }else{
            res.status(404).json({error: "No product found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch products."})
    }
})


//find all products
async function findAllProducts(){
    try {
        const products = await Product.find().populate("category")        
        return products
    } catch (error) {
        console.log(error)
    }
}

const getProducts = asyncHandler(async (req, res)=>{
    try {
        const products = await findAllProducts()
        if(products.length != 0){
            res.json(products)
        }else{
            res.status(404).json({error: "No product found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch products."})
    }
})

//  delete product
async function deleteProducts(productId){
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId) 
        return deletedProduct
    } catch (error) {
       console.log(error) 
    }
}
const deleteProduct = asyncHandler(async (req,res)=>{
    try {
        const deletedProduct = await deleteProducts(req.params.productId)
        if(deletedProduct){
            res.status(200).json({message: "Product Deleted Successfully."})
        }else{
            res.status(404).json({error: "Product not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete Product."})
    }
})


module.exports = {addProduct, getProductById, getProducts, deleteProduct }