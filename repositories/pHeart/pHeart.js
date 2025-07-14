import { PrismaClient } from "@prisma/client";
import { skip } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();

// heart patch (입력값 data는 객체, id는 문자열)
export const patchPHeart = async (id, data) => {
  return await prisma.pHeart.update({
    where: { id: id },
    data: data,
  });
};
