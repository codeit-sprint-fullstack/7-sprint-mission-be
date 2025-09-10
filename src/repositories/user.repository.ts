import prisma from "../config/prisma";


export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  img?: string;
}) => {
  return await prisma.user.create({
    data,
  });
};

export const findUserById = async (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};
