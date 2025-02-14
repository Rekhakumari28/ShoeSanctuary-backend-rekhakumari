const express = require('express')
const router = express.Router()

const {addToCartHistory, getAllCartHistory , getCartHistoryByUser , removeCartHistory} = require('../controllers/orderHistoryController')

router.post("/", addToCartHistory)
router.get("/", getAllCartHistory)
router.get("/:email", getCartHistoryByUser)
router.delete("/:cartHistoryId", removeCartHistory)

module.exports = router