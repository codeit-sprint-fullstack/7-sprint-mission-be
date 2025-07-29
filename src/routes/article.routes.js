// src/routes/article.routes.js

import express from "express";
import {
  getArticleById,
  getArticlesController,
  postArticle,
  toggleArticleLikeController,
} from "../controllers/article.controller.js";
import { requireAuth, setUserIfExists } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getArticlesController); //전체 게시글 조회
router.get("/:id", setUserIfExists, getArticleById); // 게시글 상세조회
router.post("/", requireAuth, postArticle); // 게시글 작성
router.post("/:id/like", requireAuth, toggleArticleLikeController); // 게시글 좋아요
export default router;
