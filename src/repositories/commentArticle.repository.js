//src/repositories/commentArticle.repository.js
import prisma from "../utils/prismaClient.js";

export async function findCommentsByArticleId(articleId) {
  return prisma.articleComment.findMany({
    where: { articleId },
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
