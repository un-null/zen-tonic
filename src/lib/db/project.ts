import { prisma } from "../prisma";

// Fix name to identify async
export const getProjectTitles = (userId: string) => {
  return prisma.project.findMany({
    where: {
      user_id: userId,
    },
    select: {
      title: true,
    },
  });
};

export const getProjectDetail = (projectId: string) => {
  return prisma.project.findFirst({
    where: {
      id: projectId,
    },
  });
};
