const express = require('express')
const router = express.Router()

const {addOrderItem, getOrderItem, deleteOrderItem} = require('../controllers/orderItemController')

router.post("/", addOrderItem)
router.get("/:orderId", getOrderItem)
router.delete("/:orderId", deleteOrderItem)

module.exports = router