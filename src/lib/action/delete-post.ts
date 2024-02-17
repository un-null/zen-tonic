"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const deletePost = async (postId: string) => {
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  revalidatePath("/");
  redirect("/");
};
