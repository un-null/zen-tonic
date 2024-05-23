import { prisma } from "../lib/prisma";

export const getTodaysSyncData = (userId: string) => {
  return prisma.notion_Sync.findFirst({
    where: {
      user_id: userId,
    },
    orderBy: { executed_at: "desc" },
  });
};
