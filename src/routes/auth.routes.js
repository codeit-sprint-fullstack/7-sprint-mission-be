//src/routes/auth.routes.js
import express from "express";
import {
  postSignIn,
  postRefreshToken,
  getMe,
  postLogout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signIn", postSignIn);
router.post("/refresh-token", postRefreshToken);
router.get("/me", getMe);
router.post("/logout", postLogout);

export default router;
