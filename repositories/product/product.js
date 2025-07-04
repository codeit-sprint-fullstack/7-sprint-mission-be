import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// 상품게시글 목록 조회 get
// offset 페이지네이션, 최신순 정렬
// name과 description에 포함된 단어로 검색
export const getAllProducts = async ({ keyword, offset = 0, limit = 10 }) => {
  const whereCondition = keyword
    ? {
        OR: [
          {
            name: { contains: keyword, mode: "insensitive" },
          },
          {
            description: { contains: keyword, mode: "insensitive" },
          },
        ],
      }
    : undefined;

  return await prisma.product.findMany({
    where: whereCondition,
    select: { id: true, name: true, price: true, createdAt: true },
    orderBy: { updatedAt: "desc" },
    skip: parseInt(offset),
    take: parseInt(limit),
  });
};

// 상품게시글 단일 조회 get
export const getProductById = async (id) => {
  return await prisma.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      tag: true,
      createdAt: true,
    },
  });
};

// 상품게시글 등록 post (입력값 data는 객체)
export const postProduct = async (data) => {
  return await prisma.product.create({
    data: data,
  });
};

// 상품게시글 수정 patch (입력값 data는 객체, id는 문자열)
export const patchProduct = async (id, data) => {
  return await prisma.product.update({
    where: { id: id },
    data: data,
  });
};

// 상품게시글 삭제 delete (입력값 id)
export const deleteProduct = async (id) => {
  return await prisma.product.delete({ where: { id: id } });
};
