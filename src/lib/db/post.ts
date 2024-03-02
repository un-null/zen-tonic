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
