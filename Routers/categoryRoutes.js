const express = require('express')
const router = express.Router() 

const {getCategory, getCategoryById} = require('../controllers/categoryController')

router.get("/:categoryId", getCategoryById )

router.get("/", getCategory)

module.exports = router
