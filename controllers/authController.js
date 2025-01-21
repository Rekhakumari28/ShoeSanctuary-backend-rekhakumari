const asyncHandler = require("express-async-handler");

const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { username, email, password, phone } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "username already registerd." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User Registerd Successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to Registerd." });
  }
});

const login = asyncHandler(async (req, res) => {
  const { username, email, password, phone } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "No user Found." });
    }
    if (password === user.password) {
        const token = jwt.sign({ id: user._id }, email);
       
    }

    user.password = undefined
  } catch (error) {
    res.status(500).json({ error: "Failed to login." });
  }
});

module.exports = { login, register };
