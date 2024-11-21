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
const Data = require("./models/data.model")
const Category = require("./models/category.model") 

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

//add productData in Data
async function addData(newData){
    try {
        const productData = new Data(newData)        
        const savedData = await productData.save()
        return savedData
    } catch (error) {
        console.log(error)
    }
}

app.post("/api/data", async (req,res)=>{ 

    try {
        const productData = await addData(req.body)
        res.status(201).json({message: "Data added successfully.", data:productData})
    }catch(error){
        res.status(500).json({error: "Failed to add data."})
        
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

//find categories by id
async function findCategoryById(categoryId){
    try {
        const category = await Category.findById(categoryId).populate("author")
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

//find all Data
async function findAllData(){
    try {
        const productData = await Data.find().populate("author")
        return productData
    } catch (error) {
        console.log(error)
    }
}

app.get("/api/data", async (req, res)=>{
    try {
        const productData = await findAllData()
        if(productData.length != 0){
            res.json(productData)
        }else{
            res.status(404).json({error: "No data found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch data."})
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

//delete data
async function deleteData(dataId){
    try {
        const deletedData = await Data.findByIdAndDelete(dataId) 
        return deletedData
    } catch (error) {
       console.log(error) 
    }
}

app.delete("/api/data/:dataId", async (req,res)=>{
    try {
        const deletedData = await deleteData(req.params.dataId)
        if(deletedData){
            res.status(200).json({message: "Data Deleted Successfully."})
        }else{
            res.status(404).json({error: "Data not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete data."})
    }
})

const PORT = 3000

app.listen(PORT,()=>{
    console.log('Server is running on port:', PORT)
})

module.exports = app;