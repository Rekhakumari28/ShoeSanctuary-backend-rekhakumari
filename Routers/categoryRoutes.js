const express = require('express')
const router = express.Router() 

const categoriesController = require('../controllers/categoryController')

router.post("/", categoriesController.createCategory);
router.get("/", categoriesController.getCategory);
router.post("/:categoryId", categoriesController.getCategoryById);

module.exports = router
