import { prisma } from "../prisma";

export const getUserDetail = async (id: string) => {
  return await prisma.user.findFirst({
    where: {
      id: id,
    },
  });
};
