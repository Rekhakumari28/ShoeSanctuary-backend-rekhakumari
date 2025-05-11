const express  = require('express')
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware.js")
const wishlistController = require('../controllers/wishlistController')

router.post('/:userId/items', authMiddleware, wishlistController.addToWishlist)
router.delete("/:userId/items/:productId",  authMiddleware, wishlistController.removeItem)
router.get('/:userId',  authMiddleware, wishlistController.getWishlist)

module.exports = router