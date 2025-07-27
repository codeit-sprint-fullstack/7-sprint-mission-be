//src/services/commentArticle.service.js
import {
  fetchCommentsRaw,
  insertComment,
  updateCommentContent,
  findCommentById,
  deleteCommentSoft,
  findLike,
  createLike,
  deleteLike,
  countLikes,
} from "../repositories/commentArticle.repository.js";

//댓글목록 + 유저별 liked 여부 계산
export async function fetchCommentsByArticleId(articleId, userId) {
  const comments = await fetchCommentsRaw(articleId);

  return comments.map((comment) => {
    const liked = userId
      ? comment.likes.some((like) => like.userId === userId)
      : false;
    return {
      ...comment,
      liked,
      likeCount: comment.likes.length,
    };
  });
}

export async function createComment({ articleId, userId, content }) {
  return insertComment({ articleId, userId, content });
}

export async function updateComment({ commentId, userId, content }) {
  const updated = await updateCommentContent({ commentId, userId, content });
  //updateMany() 수정된 row개수 count
  if (updated.count === 0) return null;
  return await findCommentById(commentId);
}

// 댓글 삭제
export async function deleteComment({ commentId, userId }) {
  const result = await deleteCommentSoft({ commentId, userId });
  return result.count > 0;
}

// 좋아요 토글
export async function toggleArticleCommentLike({ commentId, userId }) {
  const existing = await findLike({ commentId, userId });

  if (existing) {
    await deleteLike({ commentId, userId });
    const likeCount = await countLikes(commentId);
    return { liked: false, likeCount };
  } else {
    await createLike({ commentId, userId });
    const likeCount = await countLikes(commentId);
    return { liked: true, likeCount };
  }
}

// export async function fetchCommentsByArticleId(articleId,userId) {
//   return await findCommentsByArticleId(articleId,userId);
// }

// export async function createComment({ articleId, userId, content }) {
//   return await insertComment({ articleId, userId, content });
// }

// export async function updateComment({ commentId, userId, content }) {
//   return await modifyComment({ commentId, userId, content });
// }

// export async function deleteComment({ commentId, userId }) {
//   return await softDeleteComment({ commentId, userId });
// }

// export async function toggleArticleCommentLike({ commentId, userId }) {
//   const existingLike = await findCommentLike({ commentId, userId });

//   if (existingLike) {
//     await deleteCommentLike({ commentId, userId });
//     const likeCount = await countCommentLikes(commentId);
//     return { liked: false, likeCount };
//   } else {
//     await createCommentLike({ commentId, userId });
//     const likeCount = await countCommentLikes(commentId);
//     return { liked: true, likeCount };
//   }
// }
