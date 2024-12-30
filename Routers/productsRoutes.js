const express = require('express')
const router = express.Router()

const {addProduct, getProductById, getProducts, deleteProduct} = require('../controllers/productController')

router.post("/", addProduct)
router.get("/:productId", getProductById)
router.get("/", getProducts)
router.delete("/:productId", deleteProduct)



module.exports = router