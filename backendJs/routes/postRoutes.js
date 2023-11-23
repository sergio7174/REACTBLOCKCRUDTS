"use strict";

const 
 // use the Router module in Express.js
  router = require("express").Router(),
  PostController = require("../controller/postController"),
  Protect = require("../middleware/authMiddleware");



  router.get("/", PostController.getAllPosts);
  router.post("/", Protect.protect, PostController.createPost);
  router.get("/my/posts", Protect.protect, PostController.getMyPosts);
  router.delete("/:id", Protect.protect, PostController.deletePost);
  router.patch("/:id", Protect.protect, PostController.updatePost);
  

module.exports = router;