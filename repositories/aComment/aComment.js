import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// 상품 댓글 목록 조회 get
// 커서 기반 페이지네이션
export const getAllAComments = async (articleId, cursor, limit = 10) => {
  return await prisma.aComment.findMany({
    where: { articleId },
    select: { id: true, content: true, createdAt: true },
    cursor,
    take: parseInt(limit),
  });
};

// 상품 댓글 등록 post (입력값 data는 객체)
export const postAComment = async (articleId, data) => {
  return await prisma.aComment.create({
    data: { ...data, articleId },
  });
};

// 상품 댓글 수정 patch (입력값 data는 객체, id는 문자열)
export const patchAComment = async (articleId, id, data) => {
  return await prisma.aComment.update({
    where: { id, articleId },
    data: data,
  });
};

// 상품 댓글 삭제 delete (입력값 id)
export const deleteAComment = async (articleId, id) => {
  return await prisma.aComment.delete({ where: { id, articleId } });
};
