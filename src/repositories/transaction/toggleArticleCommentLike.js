// src/utils/toggleArticleCommentLike.js
import prisma from "../../utils/prismaClient.js";

export async function handleToggleArticleCommentLikeTx({ commentId, userId }) {
  return await prisma.$transaction(async (tx) => {
    // 좋아요 눌렀는지 확인
    const existingLike = await tx.articleCommentLike.findUnique({
      where: {
        commentId_userId: {
          commentId,
          userId,
        },
      },
    });
    // 이미 누른거였으면 좋아요삭제
    if (existingLike) {
      await tx.articleCommentLike.delete({
        where: {
          commentId_userId: {
            commentId,
            userId,
          },
        },
      });
    } else {
      //아니면 좋아요 등록
      await tx.articleCommentLike.create({
        data: {
          commentId,
          userId,
        },
      });
    }

    //좋아요 개수 계산
    const likeCount = await tx.articleCommentLike.count({
      where: { commentId },
    });
    return {
      liked: !existingLike,
      likeCount,
    };
  });
}
