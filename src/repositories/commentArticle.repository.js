//src/repositories/commentArticle.repository.js
import prisma from "../utils/prismaClient.js";

export async function fetchCommentsRaw(articleId) {
  return prisma.articleComment.findMany({
    where: { articleId, deletedAt: null },
    include: {
      user: { select: { id: true, nickname: true, image: true } },
      likes: { select: { userId: true } },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function insertComment(data) {
  return prisma.articleComment.create({
    data,
    include: {
      user: { select: { id: true, nickname: true, image: true } },
    },
  });
}

export async function updateCommentContent({ commentId, userId, content }) {
  return prisma.articleComment.updateMany({
    where: { id: commentId, userId, deletedAt: null },
    data: { content },
  });
}

export async function findCommentById(commentId) {
  return prisma.articleComment.findUnique({
    where: { id: commentId },
    include: {
      user: { select: { id: true, nickname: true, image: true } },
    },
  });
}

export async function deleteCommentSoft({ commentId, userId }) {
  return prisma.articleComment.updateMany({
    where: { id: commentId, userId, deletedAt: null },
    data: { deletedAt: new Date() },
  });
}

export async function findLike({ commentId, userId }) {
  return prisma.articleCommentLike.findUnique({
    where: { commentId_userId: { commentId, userId } },
  });
}

export async function createLike({ commentId, userId }) {
  return prisma.articleCommentLike.create({
    data: { commentId, userId },
  });
}

export async function deleteLike({ commentId, userId }) {
  return prisma.articleCommentLike.delete({
    where: { commentId_userId: { commentId, userId } },
  });
}

export async function countLikes(commentId) {
  return prisma.articleCommentLike.count({ where: { commentId } });
}

// export async function findCommentsByArticleId(articleId, userId = null) {
//   const comments = await prisma.articleComment.findMany({
//     where: { articleId, deletedAt: null },
//     include: {
//       user: {
//         select: {
//           id: true,
//           nickname: true,
//           image: true,
//         },
//       },
//       likes: { select: { userId: true } },
//     },
//     orderBy: { createdAt: "asc" },
//   });

//   return comments.map((comment) => {
//     const likeCount = comment.likes.length;
//     const liked = userId
//       ? comment.likes.some((like) => like.userId === userId)
//       : false; //likes배열에 내 아이디 있으면 true
//     return { ...comment, likeCount, liked };
//   });
// }

// export async function insertComment({ articleId, userId, content }) {
//   return prisma.articleComment.create({
//     data: {
//       articleId,
//       userId,
//       content,
//     },
//     include: {
//       user: {
//         select: {
//           id: true,
//           nickname: true,
//           image: true,
//         },
//       },
//     },
//   });
// }

// export async function modifyComment({ commentId, userId, content }) {
//   const updated = await prisma.articleComment.updateMany({
//     where: {
//       id: commentId,
//       userId,
//       deletedAt: null,
//     },
//     data: {
//       content,
//     },
//   });

//   // updateMany는 count만 반환함
//   if (updated.count === 0) return null;

//   // 수정된 댓글 다시 조회하여 반환
//   return prisma.articleComment.findUnique({
//     where: { id: commentId },
//     include: {
//       user: {
//         select: {
//           id: true,
//           nickname: true,
//           image: true,
//         },
//       },
//     },
//   });
// }

// export async function softDeleteComment({ commentId, userId }) {
//   const deleted = await prisma.articleComment.updateMany({
//     where: {
//       id: commentId,
//       userId,
//       deletedAt: null,
//     },
//     data: {
//       deletedAt: new Date(),
//     },
//   });

//   return deleted.count > 0;
// }

// // 댓글 좋아요 존재 여부 확인 (중복 추천 방지용)
// export async function findCommentLike({ commentId, userId }) {
//   return prisma.articleCommentLike.findUnique({
//     where: {
//       commentId_userId: {
//         commentId,
//         userId,
//       },
//     },
//   });
// }

// // 댓글 좋아요 추가
// export async function createCommentLike({ commentId, userId }) {
//   return prisma.articleCommentLike.create({
//     data: {
//       commentId,
//       userId,
//     },
//   });
// }

// // 댓글 좋아요 삭제 (추천 취소)
// export async function deleteCommentLike({ commentId, userId }) {
//   return prisma.articleCommentLike.delete({
//     where: {
//       commentId_userId: {
//         commentId,
//         userId,
//       },
//     },
//   });
// }

// // 댓글 좋아요 수 세기
// export async function countCommentLikes(commentId) {
//   return prisma.articleCommentLike.count({
//     where: { commentId },
//   });
// }
