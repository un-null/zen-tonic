import { prisma } from "../lib/prisma";

export const getUserDetail = async (id: string) => {
  return await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
};

export const getUserById = (id: string) => {
  return prisma.user.findFirst({
    where: {
      id: id,
    },
  });
};

export const getUserCreatedAt = (id: string) => {
  return prisma.user.findFirst({
    where: {
      id: id,
    },
    select: {
      created_at: true,
    },
  });
};
