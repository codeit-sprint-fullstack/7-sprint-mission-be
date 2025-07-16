import { PrismaClient } from "@prisma/client";
import { Prisma } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// 자유게시글 목록 조회 get
// offset 페이지네이션, 최신순 정렬
// title, content에 포함된 단어로 검색
export const getAllArticles = async ({
  userId,
  keyword,
  offset = 0,
  limit = 10,
  orderBy,
}) => {
  const search = keyword ? `%${keyword}%` : null;

  const whereClause = search
    ? Prisma.sql`AND (a.title ILIKE ${search} OR a.content ILIKE ${search})`
    : Prisma.empty;

  const orderClause =
    orderBy === "hearts"
      ? Prisma.sql`ORDER BY heart_count DESC`
      : Prisma.sql`ORDER BY a."updatedAt" DESC`;

  const rawResult = await prisma.$queryRaw`
    SELECT 
      a.id, 
      a.title, 
      a."updatedAt",
      u.id AS "userId", 
      u.nickname, 
      u.img,
      COUNT(DISTINCT CASE WHEN h.canceled = false THEN h.id END) AS heart_count,
      COUNT(DISTINCT CASE WHEN c.deleted = false THEN c.id END) AS comment_count,
      EXISTS (
        SELECT 1 FROM "AHeart" h2 
        WHERE h2."articleId" = a.id AND h2."userId" = ${userId} AND h2.canceled = false
      ) AS "isHearted",
      (
        SELECT h3.id
        FROM "AHeart" h3
        WHERE h3."articleId" = a.id
          AND h3."userId" = ${userId}
          AND h3.canceled = false
        LIMIT 1
      ) AS "heartId"
    FROM "Article" a
    JOIN "User" u ON a."userId" = u.id
    LEFT JOIN "AHeart" h ON h."articleId" = a.id
    LEFT JOIN "AComment" c ON c."articleId" = a.id
    WHERE a.deleted = false
      ${whereClause}
    GROUP BY a.id, u.id
    ${orderClause}
    LIMIT ${Number(limit)} OFFSET ${Number(offset)};
  `;

  const result = rawResult.map((row) => ({
    ...row,
    heart_count: Number(row.heart_count),
    comment_count: Number(row.comment_count),
  }));

  return result;
};

// 자유게시글 단일 조회 get
export const getArticleById = async (id, userId) => {
  return await prisma.article.findUnique({
    where: { id, deleted: false },
    select: {
      id: true,
      title: true,
      content: true,
      updatedAt: true,
      user: { select: { id: true, nickname: true, img: true } },
      AComment: {
        where: { deleted: false },
        select: {
          id: true,
          content: true,
          updatedAt: true,
          user: { select: { id: true, nickname: true, img: true } },
        },
      },
      _count: {
        select: {
          AHeart: { where: { canceled: false } },
          AComment: { where: { deleted: false } },
        },
      },
      AHeart: {
        where: { userId: userId || "noUser", canceled: false },
        select: { id: true },
      },
    },
  });
};

// 자유게시글 등록 post (입력값 data는 객체)
export const postArticle = async (data) => {
  return await prisma.article.create({
    data: data,
  });
};

// 자유게시글 수정 patch (입력값 data는 객체, id는 문자열)
export const patchArticle = async (id, data) => {
  return await prisma.article.update({
    where: { id: id },
    data: data,
  });
};

// 자유게시글 삭제 delete (입력값 id)
export const deleteArticle = async (id) => {
  return await prisma.article.delete({ where: { id: id } });
};
