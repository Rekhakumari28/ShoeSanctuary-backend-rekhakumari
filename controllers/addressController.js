const mongoose = require("mongoose");
const Address = require("../models/address.model");

//add address
exports.addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, city, postalCode, country } = req.body;

    if (!name || !city || !postalCode || !country) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const address = await Address.findOne({userId});
    if(!address){
        const newAddress = new Address({
            userId, allAddress:[{name, city, postalCode, country }]
        })
        
        await newAddress.save()
        res.status(201).json({message: "Address added successfully.", newAddress})
    }else{
        address.allAddress.push({name, city, postalCode, country })
        await address.save()
        res.status(201).json({ message: "Address added successfully.", address });
    }
    
  } catch (error) {
    res.status(500).json({ error: "Failed to add address." });
  }
};

// find all addresses

exports.getAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const address = await Address.findOne({userId})

    if (!address) {
        res.status(404).json({ error: "No address found." });    
    } 

    res.status(200).json(address.allAddress);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch address." });
  }
}

//get address by Id


exports.getAddressById = async (req, res) => {
    try {
      const { userId } = req.params;
      const { addressId } = req.params;
  
      const address = await Address.findOne({ userId });
      if (!address) {
        return res.status(404).json({ message: "No addresses found" });
      }
  
      const addressById = address.allAddress.find(
        (addrs) => addrs._id.toString() === addressId
      );
      if (!addressById) {
        return res.status(404).json({ message: "Address not found" });
      }
      res.status(200).json(addressById);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

//update address

exports.updateAddressById = async (req, res) => {
  try {
    const { userId } = req.params;
    const { addressId } = req.params;    

    if(!mongoose.Types.ObjectId.isValid(addressId)){
        return res.status(400).json({ message: "Invalid address ID" });
    }

    const address = await Address.findOneAndUpdate({userId, addressId}, req.body);
    if (!address) {
        res.status(404).json({ error: "Address not found" });     
    } 

    res.status(200).json({message: "Address updated successfully.", updateAddress: address, });

  } catch (error) {
    res.status(500).json({ error: "Failed to update address." });
  }
}

//delete address
exports.deleteAddressById = async (req, res) => {
  try {    
   
    const { addressId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(addressId)) {
        return res.status(400).json({ message: "Invalid address ID" });
      }
    const deletedAddress = await Address.findOneAndDelete(req.params.addressId);
    if (!deletedAddress) {
        res.status(404).json({ error: "Address not found" });
     
    } 
    res.status(200).json({ message: "Address Deleted Successfully.", deletedAddress });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete Address." });
  }
}
