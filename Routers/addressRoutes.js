
const express = require('express')
const router = express.Router()

const {addNewAddress, getAddress, updateAddressById , deleteAddressById} = require('../controllers/addressController')

router.post("/", addNewAddress)
router.get("/", getAddress)
router.post('/:addressId', updateAddressById)
router.delete("/:addressId", deleteAddressById)

module.exports = router