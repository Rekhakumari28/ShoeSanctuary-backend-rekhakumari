const express = require('express')
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware.js")
const orderController = require('../controllers/orderController')

router.post("/:userId/place-order", authMiddleware, orderController.placeOrder)
router.get("/:userId/order-history", authMiddleware, orderController.getOrderHistory)
router.get("/:userId/order-details/:orderId", authMiddleware, orderController.getOrderDetails)

module.exports = router