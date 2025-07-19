//src/services/commentArticle.service.js
import {
  findCommentsByArticleId,
  insertComment,
  modifyComment,
  softDeleteComment,
  findCommentLike,
  createCommentLike,
  deleteCommentLike,
  countCommentLikes,
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

export async function toggleArticleCommentLike({ commentId, userId }) {
  const existingLike = await findCommentLike({ commentId, userId });

  if (existingLike) {
    await deleteCommentLike({ commentId, userId });
    const likeCount = await countCommentLikes(commentId);
    return { liked: false, likeCount };
  } else {
    await createCommentLike({ commentId, userId });
    const likeCount = await countCommentLikes(commentId);
    return { liked: true, likeCount };
  }
}