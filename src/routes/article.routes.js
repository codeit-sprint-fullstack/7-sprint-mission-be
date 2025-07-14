// src/routes/article.routes.js

import express from "express";
import {
  getArticleById,
  getArticlesController,
  postArticle,
} from "../controllers/article.controller.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getArticlesController); //전체 게시글 조회
router.get("/:id", getArticleById); // 게시글 상세조회
router.post("/", requireAuth, postArticle); // 게시글 작성

export default router;
