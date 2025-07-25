// src/repositories/article.repository.js

import prisma from "../utils/prismaClient.js";

//@TODO db에서 꺼내오는 거 이외의 과정은 service layer로 옮기기
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
      _count: {
        select: { comments: true }, //@TODO deletedAt : null 고려해야할듯?
      },
    },
    orderBy: orderCondition,
    skip,
    take,
  });

  const totalCount = await prisma.article.count({
    where: { deletedAt: null },
  });

  const articlesWithCommentCount = articles.map((article) => ({
    ...article,
    commentCount: article._count.comments,
  }));

  return { list: articlesWithCommentCount, totalCount };
}

//게시글 상세조회
export async function findArticleById(articleId) {
  const article = await prisma.article.findFirst({
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
      _count: {
        select: { comments: true },
      },
    },
  });

  if (!article) return null;

  return { ...article, commentCount: article._count.comments };
}

//글작성
export async function createArticle({ title, content, userId }) {
  return await prisma.article.create({
    data: { title, content, userId },
  });
}
