const asyncHandler = require('express-async-handler')

const Address = require('../models/address.model')

//add address
async function addAddress(newAddress){
    try {
        const address = new Address(newAddress)        
        const savedAddress = await address.save()
        return savedAddress
    } catch (error) {
        console.log(error)
    }
}

const addNewAddress = asyncHandler (async (req,res)=>{ 
    try {
        const address = await addAddress(req.body)
        res.status(201).json({message: "address added successfully.", address: address})
    }catch(error){
        res.status(500).json({error: "Failed to add address."})        
    }
} )

// find all addresses

async function findAllAddress(){
    try {
        const address = await Address.find()
        return address
    } catch (error) {
        console.log(error)
    }
}

const getAddress = asyncHandler(async(req,res)=>{
    try {
        const address = await findAllAddress()
        if(address.length != 0){
            res.json(address)
        }else{
            res.status(404).json({error: "No address found."})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch address."})
    }
} )

//update address

async function updateAddress (addressId, dataToUpdate){
    try {
        const address = await Address.findByIdAndUpdate(addressId, dataToUpdate, {new: true})
        return address
    } catch (error) {
        console.log("Error in updating address",error)        
    }
}

const updateAddressById = asyncHandler( async(req,res)=>{
    try{
        const address = await updateAddress(req.params.addressId, req.body)
        if(address){
             res.status(200).json({message:"Address updated successfully.", updateAddress: address})
        }else{
            res.status(404).json({error: "Address not found"})
        }
    }catch(error){
        res.status(500).json({error: "Failed to update address."})
    }
})


//delete address
async function deleteAddress(addressId){
    try {
        const deletedAddress = await Address.findByIdAndDelete(addressId) 
        return deletedAddress
    } catch (error) {
       console.log(error) 
    }
}

const deleteAddressById = asyncHandler(async (req,res)=>{
    try {
        const deletedAddress = await deleteAddress(req.params.addressId)
        if(deletedAddress){
            res.status(200).json({message: "Address Deleted Successfully."})
        }else{
            res.status(404).json({error: "Address not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete Address."})
    }
})


module.exports  = {addNewAddress, getAddress, updateAddressById , deleteAddressById}

