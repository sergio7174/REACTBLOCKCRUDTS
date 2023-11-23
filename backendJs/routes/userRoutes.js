"use strict";

const 
 // use the Router module in Express.js
  router = require("express").Router(),
  UsersController = require('../controller/userController');


router.post("/register",UsersController.createUser);
router.post("/login", UsersController.loginUser);

module.exports = router;