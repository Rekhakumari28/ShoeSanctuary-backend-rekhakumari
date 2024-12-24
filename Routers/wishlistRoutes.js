const express  = require('express')
const router = express.Router()

const {addToWishlist, getWishlist, deleteFromWishlist} = require('../controllers/wishlistController')

router.post('/',addToWishlist)
router.get('/',getWishlist)
router.delete("/:productId", deleteFromWishlist)

module.exports = router