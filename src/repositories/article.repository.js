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
    },
    orderBy: orderCondition,
    skip,
    take,
  });

  const commentCounts = await prisma.articleComment.groupBy({
    by: ["articleId"],
    where: { deletedAt: null },
    _count: { articleId: true },
  });

  // [[k,v],[k2,v],[k3,v]]=>{k:v,k2:v,k3,v} //배열 ->객체
  const commentMap = Object.fromEntries(
    commentCounts.map((item) => [item.articleId, item._count.articleId])
  );

  const articlesWithCommentCount = articles.map((article) => ({
    ...article,
    commentCount: commentMap[article.id] || 0,
  }));

  const totalCount = await prisma.article.count({
    where: { deletedAt: null },
  });

  return { list: articlesWithCommentCount, totalCount };
}

//게시글 상세조회
export async function findArticleById(articleId) {
  const [article, commentCount] = await Promise.all([
    prisma.article.findFirst({
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
    }),
    prisma.articleComment.count({
      where: {
        articleId: Number(articleId),
        deletedAt: null,
      },
    }),
  ]);

  if (!article) return null;

  return { ...article, commentCount };
}

//글작성
export async function createArticle({ title, content, userId }) {
  return await prisma.article.create({
    data: { title, content, userId },
  });
}
