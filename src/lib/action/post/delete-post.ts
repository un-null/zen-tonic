"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const deletePost = async (postId: string) => {
  try {
    await prisma.post.deleteMany({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    throw Error("投稿の削除に失敗しました");
  }

  revalidatePath("/");
  redirect("/");
};
