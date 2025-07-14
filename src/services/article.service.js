//src/services/article.service.js
import { findArticleById, findArticles,createArticle } from "../repositories/article.repository.js";

export async function getArticlesService({ page, pageSize, orderBy }) {
  return await findArticles({ page, pageSize, orderBy });
}

export async function getArticleDetail(articleId) {
  const article = await findArticleById(articleId);
  if (!article) {
    const error = new Error("존재하지 않는 게시글입니다.");
    error.status = 404;
    throw error;
  }
  return article;
}

export async function handleCreateArticle(data) {
  // 예: 유효성 검사나 business logic은 여기에서
  return await createArticle(data);
}