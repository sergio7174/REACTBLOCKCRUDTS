"use strict";

const 
  
  User = require("../models/userModel"),
  jwt= require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  UserController = {};

// Export object literal with all controller actions.


    

UserController.createUser = async (req, res) => {

        const { name, email, password, avatarUrl } = req.body;
        
        
        if (!name || !email || !password) {
          res.status(400).json({ error: "Please fill all fields" });
          return;
        }
        const userExists = await User.findOne({ email });
        if (userExists) {
          res.status(400).json({ error: "User already exists" });
          return;
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
      
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          avatarUrl,
        });
        const createdUser = await newUser.save();
        const token = jwt.sign(
          { userId: createdUser._id },
          process.env.JWT_ACCESS_TOKEN,
          {
            expiresIn: "5d",
          }
        );
        if (createdUser) {
          res.status(200).json({
            _id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            token,
          });
        } else {
          res.status(400).json({ error: "Ivalid user data" });
          return;
        }
    },

// @desc Login user
// @route POST /users/login
// @access Public



UserController.loginUser= async (req, res, next) => {

  console.log("EStoy en userController - line 67 - loginUser")
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Please fill all fields" });
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      console.log("EStoy en userController - line 74 - error: No user")
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      res.status(401).json({ error: "Invalid email or password" });
      console.log("EStoy en userController - line 80 - error: No Match")
      return;
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_ACCESS_TOKEN ,
      {
        expiresIn: "5d",
      }
    );
  
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token,
    });
  }



  module.exports = UserController;