import { prisma } from "@/features/lib/prisma";

export async function DELETE() {
  const getToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

  const expiredIds = await prisma.notion_Sync.findMany({
    where: {
      executed_at: {
        lt: getToday(),
      },
    },
    select: {
      id: true,
    },
  });

  const isExpiredIds = expiredIds.length === 0;

  if (isExpiredIds) {
    const ids = expiredIds.map((data) => data.id);

    await prisma.notion_Sync.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
