//src/repositories/auth.repository.js
import prisma from "../utils/prismaClient.js";

export async function findUserByEmail(email) {
  return await prisma.user.findFirst({
    // @TODO findUnique는 안에 조건을 쓸수없어서 일단 findFirst로
    where: {
      email,
      deletedAt: null,
    },
  });
}

export async function findUserById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}
