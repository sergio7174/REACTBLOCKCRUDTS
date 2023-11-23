const 
  
  User = require("../models/userModel"),
  passport = require("passport"),
  jwt= require("jsonwebtoken"),
  bcrypt = require("bcrypt");

  // Export object literal with all controller actions.
module.exports = {

 protect : (req, res, next) => {

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: "Missing jwt token" });
    return;
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    res.status(401).json({ error: "Missing token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
},
}
