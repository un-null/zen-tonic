import { prisma } from "../lib/prisma";

export const getTodaysSyncData = async (userId: string) => {
  return await prisma.notion_Sync.findFirst({
    where: {
      user_id: userId,
    },
    orderBy: { executed_at: "desc" },
  });
};
