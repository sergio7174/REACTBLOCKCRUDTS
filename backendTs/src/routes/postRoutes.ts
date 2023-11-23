import { Router } from "express";
import {
  createPost,
  getMyPosts,
  deletePost,
  updatePost,
  getAllPosts,
} from "../controller/postController";
import protect from "../middleware/authMiddleware";

const router: Router = Router();

router.get("/", getAllPosts);
router.post("/", protect, createPost);
router.get("/my/posts", protect, getMyPosts);
router.delete("/:id", protect, deletePost);
router.patch("/:id", protect, updatePost);

export default router;
