const express = require('express')
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware")
const cartController = require('../controllers/cartController')

router.post('/:userId/items', authMiddleware, cartController.addToCart )
router.delete("/:userId/items/:productId", authMiddleware, cartController.removeProductFromCart)
router.get("/:userId", authMiddleware, cartController.getAllCart)
router.post('/:userId/items/:productId', authMiddleware, cartController.updateItemQuantity )

module.exports = router