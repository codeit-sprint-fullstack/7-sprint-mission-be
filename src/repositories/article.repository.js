// src/repositories/article.repository.js

import prisma from "../utils/prismaClient.js";

export async function fetchArticles({ skip, take, orderBy }) {
  return prisma.article.findMany({
    where: { deletedAt: null },
    include: {
      user: {
        select: { id: true, nickname: true, image: true },
      },
    },
    orderBy,
    skip,
    take,
  });
}

//페이지네이션 용 게시글 개수 카운팅
export async function countAllArticles() {
  return prisma.article.count({
    where: { deletedAt: null },
  });
}

//댓글 개수 (deletedAt 제외) groupBy
export async function groupCommentCounts() {
  return prisma.articleComment.groupBy({
    by: ["articleId"],
    where: { deletedAt: null },
    _count: { articleId: true },
  });
}
// [
//   { articleId: 1, _count: { articleId: 2 } }, // articleComment id:1,2 → 2개 (id:4는 deleted)
//   { articleId: 2, _count: { articleId: 1 } }, // id:3 → 1개
// ]

//게시글 상세+작성자
export async function fetchArticleById(articleId) {
  return prisma.article.findFirst({
    where: { id: Number(articleId), deletedAt: null },
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

// 단일게시글 댓글 갯수
export async function countCommentsOfArticle(articleId) {
  return prisma.articleComment.count({
    where: {
      articleId: Number(articleId),
      deletedAt: null,
    },
  });
}

//글작성
export async function createArticle({ title, content, userId }) {
  return await prisma.article.create({
    data: { title, content, userId },
  });
}

//////////  좋아요 영역  /////////
//@TODO userId deletedAt 고려

// 게시글 좋아요 존재 여부 확인
export async function findArticleLike({ articleId, userId }) {
  return prisma.articleLike.findUnique({
    where: {
      articleId_userId: {
        articleId: Number(articleId),
        userId: Number(userId),
      },
    },
  });
}

// 게시글 좋아요 추가
export async function createArticleLike({ articleId, userId }) {
  return prisma.articleLike.create({
    data: {
      articleId,
      userId,
    },
  });
}

// 게시글 좋아요 삭제
export async function deleteArticleLike({ articleId, userId }) {
  return prisma.articleLike.delete({
    where: {
      articleId_userId: {
        articleId,
        userId,
      },
    },
  });
}

// 게시글 좋아요 수 카운팅
export async function countArticleLikes(articleId) {
  return prisma.articleLike.count({
    where: {
      articleId,
    },
  });
}
