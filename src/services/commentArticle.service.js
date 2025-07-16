//src/services/commentArticle.service.js
import {
  findCommentsByArticleId,
  insertComment,
} from "../repositories/commentArticle.repository.js";

export async function fetchCommentsByArticleId(articleId) {
  return await findCommentsByArticleId(articleId);
}

export async function createComment({ articleId, userId, content }) {
  return await insertComment({ articleId, userId, content });
}
