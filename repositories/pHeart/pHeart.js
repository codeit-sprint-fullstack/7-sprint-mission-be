import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// heart post (좋아요 생성. 유저id와 게시물 id가 필요)
export const postPHeart = async (data) => {
  return await prisma.pHeart.create({
    data: data,
  });
};

// heart patch (입력값 data는 객체, id는 문자열)
export const patchPHeart = async (id, data) => {
  return await prisma.pHeart.update({
    where: { id: id },
    data: data,
  });
};
