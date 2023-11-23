import { Router } from "express";
import { createUser, loginUser } from "../controller/userController";
import protect from "../middleware/authMiddleware";

const router: Router = Router();

router.post("/register", createUser);
router.post("/login", loginUser);

export default router;
