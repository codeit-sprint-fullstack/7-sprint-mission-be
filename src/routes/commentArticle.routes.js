//src/routes/commentArticle.routes.js
import express from "express";
import {
  getComments,
  postComment,
  patchComment,
  deleteComment,
  toggleLikeComment,
} from "../controllers/commentArticle.controller.js";

import { requireAuth, setUserIfExists } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:articleId/comments", setUserIfExists, getComments);
router.post("/:articleId/comments", requireAuth, postComment);
router.patch("/:articleId/comments/:commentId", requireAuth, patchComment);
router.delete("/:articleId/comments/:commentId", requireAuth, deleteComment);
router.post(
  "/:articleId/comments/:commentId/like",
  requireAuth,
  toggleLikeComment
);

export default router;
