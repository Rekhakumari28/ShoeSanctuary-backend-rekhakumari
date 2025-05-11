const asyncHandler  = require('express-async-handler')

//import model
const Product = require('../models/product.model.js')

 //add product
async function createProducts(products){
    try {
        if(!Array.isArray(products)){
            throw new TypeError("Produts should be an array.")
        }

       const updatedProducts = products.map((product)=>{
        product.categoryId = product.categoryId.toString()
        return product
       })

          const savedProducts = await Product.insertMany(updatedProducts);
    return savedProducts;

    } catch (error) {
        console.error("Error creating product.", error)
    }
}

exports.addProduct = async (req,res)=>{ 

    try {
        console.log("Request Body:", req.body);
        const saveProducts = await createProducts(req.body)
        res.status(201).json({message: "Product created successfully.", saveProducts})
    }catch(error){
        res.status(500).json({error: "Failed to create product."})
        
    }
}

//find product by Id

async function findProductById(productId){
    try {
        const products = await Product.findById(productId).populate("category")
        return products
    } catch (error) {
        console.log(error)
    }
}

exports.getProductById = async (req, res)=>{
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
}


//find all products
async function findAllProducts(){
    try {
        const products = await Product.find().populate("category")        
        return products
    } catch (error) {
        console.log(error)
    }
}

exports.getProducts = async (req, res) => {
    try {
      const products = await findAllProducts();
      if (products.length !== 0) {
        res.json({ data: { products } });
      } else {
        res.status(404).json({ error: "No products found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to fetch products" });
    }
  }

//update product
async function updateProduct (productId, dataToUpdate){
    try {
        const products = await Product.findByIdAndUpdate(productId, dataToUpdate, {new: true})
        return products
    } catch (error) {
        console.log("Error in updating products",error)        
    }
}

exports.updateProductItemById =  async(req,res)=>{
    try{
        const products = await updateProduct(req.params.productId, req.body)
        if(products){
             res.status(200).json({message:"products updated successfully.", products: products})
        }else{
            res.status(404).json({error: "products not found"})
        }
    }catch(error){
        res.status(500).json({error: "Failed to update products."})
    }
}

//  delete product
async function deleteProducts(productId){
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId) 
        return deletedProduct
    } catch (error) {
       console.log(error) 
    }
}
exports.deleteProduct = async (req,res)=>{
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
}


