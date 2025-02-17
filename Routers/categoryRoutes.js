const express = require('express')
const router = express.Router() 

const {getCategory, updateCategoryById, getCategoryById} = require('../controllers/categoryController')

router.get("/:categoryId", getCategoryById )
router.post("/:categoryId", updateCategoryById)
router.get("/", getCategory)

module.exports = router
