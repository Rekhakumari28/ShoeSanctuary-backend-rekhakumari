//import express
const express = require("express")
const app = express()

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const {initializeDatabase} = require('./db/db.connection')

//import models
const Product = require('./models/product.model')
const Category = require("./models/category.model") 
const Cart = require('./models/cart.model')
const User = require('./models/user.model')
app.use(express.json())

initializeDatabase();

app.get("/", (req,res)=>{
    res.send("Hello Express")
})

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

app.post("/api/products", async (req,res)=>{ 

    try {
        const products = await addProducts(req.body)
        res.status(201).json({message: "Product added successfully.", product:products})
    }catch(error){
        res.status(500).json({error: "Failed to add product."})
        
    }
})

//find products by id
async function findProductById(productId){
    try {
        const products = await Product.findById(productId).populate("author")
        return products
    } catch (error) {
        console.log(error)
    }
}

app.get("/api/products/:productId", async (req, res)=>{
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
        const products = await Product.find().populate("author")        
        return products
    } catch (error) {
        console.log(error)
    }
}

app.get("/api/products", async (req, res)=>{
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
//delete product
async function deleteProduct(productId){
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId) 
        return deletedProduct
    } catch (error) {
       console.log(error) 
    }
}

app.delete("/api/products/:productId", async (req,res)=>{
    try {
        const deletedProduct = await deleteProduct(req.params.productId)
        if(deletedProduct){
            res.status(200).json({message: "Product Deleted Successfully."})
        }else{
            res.status(404).json({error: "Product not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete Product."})
    }
})

//add category

async function addCategory(newCategory){
    try {
        const categoryData = new Category(newCategory)
        const savedCategory = await categoryData.save()
        return savedCategory
    } catch (error) {
        console.log(error)
    }
}

app.post("/api/categories", async (req,res)=>{ 

    try {
        const categoryData = await addCategory(req.body)
        res.status(201).json({message: "Category added successfully.", category:categoryData})
    }catch(error){
        res.status(500).json({error: "Failed to add category."})
        
    }
})
//find categories by id
async function findCategoryById(categoryId){
    try {
        const category = await Category.findById(categoryId)
        return category
    } catch (error) {
        console.log(error)
    }
}

app.get("/api/categories/:categoryId", async (req, res)=>{
    try {
        const category = await findCategoryById(req.params.categoryId)
        if(category.length != 0){
            res.json(category)
        }else{
            res.status(404).json({error: "No category found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch category."})
    }
})

//find all categories
async function findAllCategory(){
    try {
        const categoryData = await Category.find()
        return categoryData
    } catch (error) {
        console.log(error)
    }
}

app.get("/api/categories", async (req, res)=>{
    try {
        const categoryData = await findAllCategory()
        if(categoryData.length != 0){
            res.json(categoryData)
        }else{
            res.status(404).json({error: "No category found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch category."})
    }
})
//delete category
async function deleteCategory(categoryId){
    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId) 
        return deletedCategory
    } catch (error) {
       console.log(error) 
    }
}

app.delete("/api/categories/:categoryId", async (req,res)=>{
    try {
        const deletedCategory = await deleteCategory(req.params.categoryId)
        if(deletedCategory){
            res.status(200).json({message: "Category Deleted Successfully."})
        }else{
            res.status(404).json({error: "Category not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete Category."})
    }
})

//add Data
async function createCart(newCart){
    try {
        const cart = new Cart(newCart)
        const savedCart = await cart.save()
        return savedCart
    } catch (error) {
    console.log(error)        
    }
}

app.post('/api/cart', async(req, res)=>{
    try {
        const cart = new createCart(req.body)
        res.json(cart)
    } catch (error) {
        res.status(500).json({error: "cart not created."})
    }
})

//find all data
async function findAllCart(){
    try {
        const cart = await Cart.find().populate("User").populate("Product").then((cart) => {
            console.log('cart:', cart);
        })
        .catch((err) => {
            console.error('Error:', err);
        })
        return cart
    } catch (error) {
        console.log(error)
    }
}

app.get("/api/cart", async(req,res)=>{
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

//delete cart
async function deleteCart(cartId){
    try {
        const deletedCart = await Cart.findByIdAndDelete(cartId) 
        return deletedCart
    } catch (error) {
       console.log(error) 
    }
}

app.delete("/api/cart/:cartId", async (req,res)=>{
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

//add user
async function createUser(newUser){
    try {
        const user = new User(newUser)
        const savedUser = await user.save()
        return savedUser
    } catch (error) {
    console.log(error)        
    }
}

app.post('/api/user', async(req, res)=>{
    try {
        const user = new createUser(req.body)
        res.json(user)  
    } catch (error) {
        res.status(500).json({error: "user not created."})
    }
})
//find all user
async function findAllUser(){
    try {
        const user = await User.find()
        return user
    } catch (error) {
        console.log(error)
    }
}
app.get("/api/user", async(req,res)=>{
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



const PORT = 3000

app.listen(PORT,()=>{
    console.log('Server is running on port:', PORT)
})

module.exports = app;