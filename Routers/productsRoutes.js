const express = require('express')
const router = express.Router()

const {getProductById, getProducts} = require('../controllers/productController')

router.get("/:productId", getProductById)
// router.get("/api/products/:productId", )

router.get("/", getProducts)
// router.get("/api/products", )


module.exports = router