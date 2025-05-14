const mongoose = require("mongoose");
const Cart = require('../models/cart.model')

//add cart

exports.addToCart = async(req, res)=>{  
    try {
        const {userId} = req.params
        const {productId, title, price, quantity, images} = req.body
    
        if (  !productId && !title && !quantity && !price && images ) {
            return res.status(400).json({ message: "All fields are required" });
          }
    
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
          }   
    
        let cart = await Cart.findOne({userId})

        if(!cart){
            cart = new Cart({ userId, products: [{productId, title, price, quantity, images}] });
        }

        const itemIndex = cart.products.findIndex(
            (item) => item.productId === productId
          );
          if(itemIndex > -1){
            cart.products[itemIndex].quantity += quantity || 1;
          }else{
            cart.products.push({  productId, title, price, quantity: quantity || 1, images   })
          }

       await cart.save()
        res.status(201).json({message:"Item added to cart", cart})
    } catch (error) {
        res.status(500).json({error: "Internal server error.", error:error.message})
    }
}

//delete product from cart
exports.removeProductFromCart =  async (req,res)=>{
    const { userId, productId } = req.params;
    if(!userId || !productId){
        return res.status(400).json({ message: "All fields required" });
    }
    try {
        const cart = await Cart.findOne({userId})
        if(!cart){
            res.status(404).json({error: "cart not found"})
        }
        
        cart.products = cart.products.filter((item)=>item.productId !== parseInt(productId))
        await cart.save();
        res.status(200).json({message:"Product is removed from cart.", cart})

    } catch (error) {
        res.status(500).json({error: "Internal server error.", error })
    }
}

//find all data

exports.getAllCart = async(req,res)=>{
    const {userId} = req.params
    if(!userId){
        return res.status(400).json({error:"User Id is missing."})
    }
    try {
        const cart = await Cart.findOne({userId})
        if(!cart){
            res.status(404).json({error: "No cart found."})            
        }
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch cart.", error})
    }
}

//update cart

exports.updateItemQuantity =  async(req,res)=>{
    const { userId, productId } = req.params;
    const { quantity } = req.body;
  
    if (!userId || !productId || !quantity) {
      return res.status(400).json({ message: "All field required." });
    }

    try {
        const cart = await Cart.findOne({userId})
        if(!cart){
            res.status(404).json({error: "cart not found"})           
        }
        const itemIndex  = cart.products.findIndex((item)=>item.productId === parseInt(productId))

        if(itemIndex === -1){
            return res.status(404).json({error:"Item is not in cart."})
        }

        cart.products[itemIndex].quantity = quantity
        await cart.save()
        res.status(200).json({message:"cart item quantity updated successfully.", cart: cart})
    }catch(error){
        res.status(500).json({error: "Failed to update cart."})
    }
}



