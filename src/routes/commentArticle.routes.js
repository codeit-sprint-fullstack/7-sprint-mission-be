//src/routes/commentArticle.routes.js
import express from "express";
import {
  getComments,
  postComment,
  patchComment,
  deleteComment,
} from "../controllers/commentArticle.controller.js";

import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:articleId/comments", getComments);
router.post("/:articleId/comments", requireAuth, postComment);
router.patch("/:articleId/comments/:commentId", requireAuth, patchComment);
router.delete("/:articleId/comments/:commentId", requireAuth, deleteComment);

export default router;
