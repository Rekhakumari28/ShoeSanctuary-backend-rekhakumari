const express = require('express')
const router = express.Router()

const {addOrderItem, getOrderItem, getProducts, deleteOrderItem} = require('../controllers/orderItemController')

router.post("/", addOrderItem)
router.get("/:orderId", getOrderItem)
router.get("/", getProducts)
router.delete("/:orderId", deleteOrderItem)

module.exports = router