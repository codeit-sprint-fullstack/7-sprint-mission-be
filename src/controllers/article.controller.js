// src/controllers/article.controller.js

import {
  getArticleDetail,
  getArticlesService,
  handleCreateArticle,
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
    const articleId = req.params.id;
    const article = await getArticleDetail(articleId);
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
