import { prisma } from "../lib/prisma";

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

export const getInProgressProject = (userId: string) => {
  return prisma.project.findFirst({
    where: {
      user_id: userId,
    },
    orderBy: { start_date: "desc" },
    select: {
      id: true,
      title: true,
      start_date: true,
    },
  });
};

export const getAsyncInProgressProject = async (userId: string) => {
  return await prisma.project.findFirst({
    where: {
      user_id: userId,
    },
    orderBy: { start_date: "desc" },
    select: {
      id: true,
      title: true,
      start_date: true,
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
