const express = require('express')
const router = express.Router()

const {addToCartHistory, getAllCartHistory , getCartHistoryByUser, getCartHistoryById , removeCartHistory} = require('../controllers/orderHistoryController')

router.post("/", addToCartHistory)
router.get("/", getAllCartHistory)
router.get("/:email", getCartHistoryByUser)
router.get("/:cartHistoryId", getCartHistoryById)
router.delete("/:cartHistoryId", removeCartHistory)

module.exports = router