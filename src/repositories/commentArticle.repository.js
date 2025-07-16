//src/repositories/commentArticle.repository.js
import prisma from "../utils/prismaClient.js";

export async function findCommentsByArticleId(articleId) {
  return prisma.articleComment.findMany({
    where: { articleId, deletedAt: null },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function insertComment({ articleId, userId, content }) {
  return prisma.articleComment.create({
    data: {
      articleId,
      userId,
      content,
    },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });
}

export async function modifyComment({ commentId, userId, content }) {
  const updated = await prisma.articleComment.updateMany({
    where: {
      id: commentId,
      userId,
      deletedAt: null,
    },
    data: {
      content,
    },
  });

  // updateMany는 count만 반환함
  if (updated.count === 0) return null;

  // 수정된 댓글 다시 조회하여 반환
  return prisma.articleComment.findUnique({
    where: { id: commentId },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
          image: true,
        },
      },
    },
  });
}

export async function softDeleteComment({ commentId, userId }) {
  const deleted = await prisma.articleComment.updateMany({
    where: {
      id: commentId,
      userId,
      deletedAt: null,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  return deleted.count > 0;
}
