const express = require('express')
const router = express.Router()
const {addNewUser, getAllUser, getUserByEmail} = require('../controllers/userController')

router.post('/', addNewUser)
router.get("/", getAllUser)
router.get("/:email", getUserByEmail)

module.exports = router