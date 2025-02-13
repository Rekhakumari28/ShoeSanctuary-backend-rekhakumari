const express = require('express')
const router = express.Router()

const {addToCart, getAllCart , getCartByUser, removeCart ,updatCartById} = require('../controllers/cartController')

router.post('/', addToCart )
router.get("/", getAllCart)
router.get("/:user", getCartByUser )
router.delete("/:cartId", removeCart)
router.post('/:cartId', updatCartById )

module.exports = router