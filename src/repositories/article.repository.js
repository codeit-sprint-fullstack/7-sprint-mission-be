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
