const express = require('express')
const router = express.Router()

const {addToCartHistory, getAllCartHistory , getCartHistoryByUser} = require('../controllers/orderHistoryController')

router.post("/", addToCartHistory)
router.get("/", getAllCartHistory)
router.get("/:email", getCartHistoryByUser)

module.exports = router