"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const deleteProject = async (projectId: string) => {
  try {
    await prisma.project.deleteMany({
      where: {
        id: {
          in: [projectId],
        },
      },
    });
  } catch (error) {
    throw Error("投稿の削除に失敗しました");
  }

  revalidatePath("/");
  redirect("/");
};

const getProjectInfo = async (projectId: string) => {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
    },
    select: {
      database_id: true,
    },
  });

  return {
    databaseId: project?.database_id,
  };
};
