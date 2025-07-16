//src/services/commentArticle.service.js
import {
  findCommentsByArticleId,
  insertComment,
  modifyComment,
  softDeleteComment,
} from "../repositories/commentArticle.repository.js";

export async function fetchCommentsByArticleId(articleId) {
  return await findCommentsByArticleId(articleId);
}

export async function createComment({ articleId, userId, content }) {
  return await insertComment({ articleId, userId, content });
}

export async function updateComment({ commentId, userId, content }) {
  return await modifyComment({ commentId, userId, content });
}

export async function deleteComment({ commentId, userId }) {
  return await softDeleteComment({ commentId, userId });
}
