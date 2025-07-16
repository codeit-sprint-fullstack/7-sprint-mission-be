//src/routes/commentArticle.routes.js
import express from "express";
import {
  getComments,
  postComment,
} from "../controllers/commentArticle.controller.js";

import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:articleId/comments", getComments);
router.post("/:articleId/comments", requireAuth, postComment);

export default router;
