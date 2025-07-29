// src/utils/transaction/toggleArticleLike.js

import prisma from "../../utils/prismaClient.js";

export async function handleToggleArticleLikeTx({ articleId, userId }) {
  return await prisma.$transaction(async (tx) => {
    const existingLike = await tx.articleLike.findUnique({
      where: {
        articleId_userId: {
          articleId,
          userId,
        },
      },
    });

    if (existingLike) {
      //이미 좋아요 눌린 상태라면 좋아요 취소
      await tx.articleLike.delete({
        where: {
          articleId_userId: {
            articleId,
            userId,
          },
        },
      });
    } else {
      await tx.articleLike.create({
        data: { articleId, userId },
      });
    }

    const likeCount = await tx.articleLike.count({
      where: { articleId },
    });
    await tx.article.update({
      where: { id: articleId },
      data: { likeCount },
    });

    return { liked: !existingLike, likeCount };
  });
}
