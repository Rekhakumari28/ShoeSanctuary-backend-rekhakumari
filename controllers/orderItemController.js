const asyncHandler = require('express-async-handler')

const OrderItem = require('../models/orderItem.model')

//create Order
async function createOrderItem(newItem){
    try {
        const orderItem  = new OrderItem(newItem)
        const savedOrderItem = orderItem.save()
        return savedOrderItem
    } catch (error) {
        console.log("An error occured while adding orderItem.", error)
    }
}

const addOrderItem = asyncHandler( async(req,res)=>{
    try {
        const orderItem = await createOrderItem(req.body)
        res.status(201).json({message: "order added successfully.", order:orderItem})
    } catch (error) {
        res.status(500).json({error: "order is not added."})
    }
})

// get order Item
async function getOrderItemById(orderId){
    try {
        const orderItem = await OrderItem.findById(orderId).populate('product')
        return orderItem
    } catch (error) {
        console.log("An error occured.", error)       
    }
}

const getOrderItem = asyncHandler( async(req,res)=>{
    try {
        const orderItem = await getOrderItemById(req.params.orderId)
        if(orderItem.length != 0){
            res.json(orderItem)
        }else{
            res.status(404).json({error: "Order not found."})
        }
    } catch (error) {
        res.status(500).json({error:'Failed to fetch order.'})
    }
})

//get all items

//find all products
async function findAllOrderItem(){
    try {
        const orderItem = await OrderItem.find().populate("product")        
        return orderItem
    } catch (error) {
        console.log(error)
    }
}

const getProducts = asyncHandler(async (req, res)=>{
    try {
        const orderItem = await findAllOrderItem()
        if(orderItem.length != 0){
            res.json(orderItem)
        }else{
            res.status(404).json({error: "No orderItem found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch orderItem."})
    }
})


//delete orderItem
async function deleteOrderItemById(orderId){
    try {
        const orderItem = await OrderItem.findByIdAndDelete(orderId)
        console.log(orderItem)
        return orderItem
    } catch (error) {
        console.log("An error occured.", error)       
    }
}

const deleteOrderItem = asyncHandler( async(req,res)=>{
    try {
        const orderItem = await deleteOrderItemById(req.params.orderId)
        if(orderItem){
            res.status(200).json({message: "Order Deleted Successfully."})
        }else{
            res.status(404).json({error: "Order not found."})
        }
    } catch (error) {
        res.status(500).json({error:'Failed to fetch order.'})
    }
})


module.exports = {addOrderItem, getOrderItem, getProducts, deleteOrderItem}