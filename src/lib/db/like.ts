import { prisma } from "../prisma";

export const getAllLikes = async (userId?: string) => {
  return await prisma.like.findMany({
    where: {
      user_id: userId,
    },
    select: {
      id: true,
      created_at: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
};
