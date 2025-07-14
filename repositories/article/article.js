import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// 자유게시글 목록 조회 get
// offset 페이지네이션, 최신순 정렬
// title, content에 포함된 단어로 검색
export const getAllArticles = async ({ keyword, offset = 0, limit = 10 }) => {
  const whereCondition = keyword
    ? {
        OR: [
          {
            title: { contains: keyword, mode: "insensitive" },
          },
          {
            content: { contains: keyword, mode: "insensitive" },
          },
        ],
      }
    : undefined;

  return await prisma.article.findMany({
    where: whereCondition,
    orderBy: { updatedAt: "desc" },
    skip: parseInt(offset),
    take: parseInt(limit),
  });
};

// 자유게시글 단일 조회 get
export const getArticleById = async (id) => {
  return await prisma.article.findUnique({
    where: { id },
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
