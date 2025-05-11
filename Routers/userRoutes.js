const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { registerValidation, loginValidation} = require("../middleware/authValidation.js")
const authMiddleware = require("../middleware/authMiddleware.js")


router.post("/signup", registerValidation, userController.signup)
router.post("/login",loginValidation, userController.login)


router.get("/:userId", authMiddleware, userController.getUserById)
router.post("/:userId", authMiddleware, userController.updateUser);
router.delete("/:userId", authMiddleware, userController.deleteUser);

router.post("/validate-token", authMiddleware, (req, res) => {
    res.status(200).json({ message: "Token is validate" });
  });
module.exports = router