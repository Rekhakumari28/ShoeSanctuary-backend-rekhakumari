
const User = require('../models/user.model')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//add user

exports.signup = async(req, res)=>{
    try {
        const {name, email, password}= req.body
        const user = await User.findOne({email})
        if(user){
            res.status(409).json({error:"User already registerd. please login.", success: false}) 
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ name, email, password: hashedPassword });
        const saveUser = await newUser.save()
        res.status(201).json({message: "Registration Successfully.", user: saveUser})
    } catch (error) {
        res.status(500).json({error: "Failed to register."})
    }
}

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(403).json({
          message: "Validation failed: email or password is wrong",
          success: false,
        });
      }
  
      const isPassEqual =  bcrypt.compare(password, user.password);
      if (!isPassEqual) {
        return res.status(403).json({
          message: "Validation failed: email or password is wrong",
          success: false,
        });
      }
  
      const jwtToken = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "48h" }
      );
  
      res.status(200).json({
        message: "Login Success",
        success: true,
        jwtToken,
        email,
        name: user.name,
        user: user
      });
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(400).json({ error: err.message });
    }
  };


//find by Id 

exports.getUserById= async (req, res)=>{
    try {
      const userId = req.params.userId;
console.log(userId, "userId")
    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }    
        const user = await User.findById({_id: userId})
      console.log(user, "user")
        if(!user){
            res.status(404).json({error: "User not found."})
        }
      
        res.status(200).json({message: "User data: ",user})

    } catch (error) {
        res.status(500).json({error: "Failed to fetch user.", error})
    }
}

// Update user by userId
exports.updateUser = async (req, res) => {
    try {
      const { name } = req.body;
      const userId = req.params.userId;
  
      if (!userId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
  
      const user = await User.findByIdAndUpdate(
        userId,
        { name},
        { new: true }
      );
  
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      console.error(error); 
      res.status(500).json({ error: error.message });
    }
  };
  
  
  // Delete a user
  exports.deleteUser = async (req, res) => {
    
    try {
      const userId = req.params.userId;
  
      if (!userId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
  
      const user = await User.findByIdAndDelete(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      console.log(`User with ID ${userId} deleted successfully`);
      res
        .status(200)
        .json({ message: "User deleted successfully" });
    } catch (error) {     
      res.status(500).json({ error: error.message });
    }
  };