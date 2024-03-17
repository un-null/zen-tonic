import { prisma } from "../prisma";

// Fix name to identify async

export const getUserLatestPosts = (userId: string) => {
  return prisma.post.findFirst({
    where: {
      user_id: userId,
    },
    orderBy: { created_at: "desc" },
  });
};

export const getAllPosts = () => {
  return prisma.post.findMany({
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      created_at: true,
      content: true,
      project: {
        select: {
          title: true,
          start_date: true,
        },
      },
      // Fix get only first data  ???
      like: true,
    },
  });
};
