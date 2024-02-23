"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const deleteProject = async (projectId: string) => {
  await prisma.project.delete({
    where: {
      id: projectId,
    },
  });

  revalidatePath("/dashboard");
  redirect("/dashboard");
};
