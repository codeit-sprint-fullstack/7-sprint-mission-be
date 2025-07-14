// src/repositories/article.repository.js

import prisma from "../utils/prismaClient.js";

//게시글 전체조회
export async function findArticles({
  page = 1,
  pageSize = 5,
  orderBy = "recent",
}) {
  const skip = (page - 1) * pageSize;
  const take = Number(pageSize);

  const orderCondition =
    orderBy === "like" ? { likeCount: "desc" } : { updatedAt: "desc" };

  const articles = await prisma.article.findMany({
    where: { deletedAt: null },
    include: {
      user: {
        select: { id: true, nickname: true, image: true },
      },
    },
    orderBy: orderCondition,
    skip,
    take,
  });

  const totalCount = await prisma.article.count({
    where: { deletedAt: null },
  });

  return { list: articles, totalCount };
}

//게시글 상세조회

export async function findArticleById(articleId) {
  return await prisma.article.findFirst({
    where: {
      id: Number(articleId),
      deletedAt: null,
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

//글작성
export async function createArticle({ title, content, userId }) {
  return await prisma.article.create({
    data: { title, content, userId },
  });
}