const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')

router.post("/", productController.addProduct)
router.get("/:productId", productController.getProductById)
router.get("/", productController.getProducts)
router.post("/:productId",productController.updateProductItemById)
router.delete("/:productId", productController.deleteProduct)



module.exports = router