import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/me", authMiddleware, userController.information);

export default router;
