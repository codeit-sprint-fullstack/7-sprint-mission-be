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
