// src/controllers/article.controller.js

import {
  getArticleDetail,
  getArticlesService,
  handleCreateArticle,
  toggleArticleLikeService,
} from "../services/article.service.js";

export async function getArticlesController(req, res, next) {
  try {
    const { page = 1, pageSize = 5, orderBy = "recent" } = req.query;
    const data = await getArticlesService({ page, pageSize, orderBy });
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export async function getArticleById(req, res, next) {
  try {
    const articleId = Number(req.params.id);
    const userId = req.user?.id ? Number(req.user.id) : undefined;
    // console.log("🐞 req.cookies:", req.cookies);
    // console.log("🐞 req.user:", req.user);
    // console.log("🐞 userId:", req.user?.id);
    const article = await getArticleDetail(articleId, userId);
    res.json(article);
  } catch (err) {
    next(err);
  }
}

export async function postArticle(req, res) {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    if (!title || !content) {
      return res.status(400).json({ message: "필수 항목이 누락되었습니다." });
    }

    const article = await handleCreateArticle({ title, content, userId });

    res.status(201).json(article);
  } catch (error) {
    console.error("게시글 작성 에러:", error);
    res.status(500).json({ message: "서버 에러" });
  }
}

export async function toggleArticleLikeController(req, res, next) {
  try {
    const articleId = Number(req.params.id);
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "로그인이 필요합니다." });
    }

    if (isNaN(articleId)) {
      return res.status(400).json({ message: "잘못된 게시글 ID입니다." });
    }

    const { liked, likeCount } = await toggleArticleLikeService({
      articleId,
      userId,
    });

    res.json({
      liked,
      likeCount,
      message: liked ? "게시글 추천 완료" : "게시글 추천 취소",
    });
  } catch (error) {
    console.error("❌ 게시글 추천 실패:", error.message);
    next(error);
  }
}
