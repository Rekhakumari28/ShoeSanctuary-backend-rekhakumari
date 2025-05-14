const authMiddleware = require("../middleware/authMiddleware.js")
const express = require('express')
const router = express.Router()

const addressController = require('../controllers/addressController')

router.post("/:userId/new-address",authMiddleware ,addressController.addAddress)
router.get("/:userId/all-address",authMiddleware , addressController.getAllAddress)
router.get("/:userId/all-address/:addressId" ,authMiddleware ,addressController.getAddressById );
router.post('/:userId/all-address/:addressId',authMiddleware , addressController.updateAddressById)
router.delete("/:userId/all-address/:addressId" ,authMiddleware , addressController.deleteAddressById)

module.exports = router