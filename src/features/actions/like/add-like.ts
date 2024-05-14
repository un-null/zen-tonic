"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";

import { getAccessToken } from "@/features/lib/auth/getAccessToken";
import { prisma } from "@/features/lib/prisma";

export const addLike = async (postId: string) => {
  const user = await currentUser();
  const accessToken = await getAccessToken(user?.id);

  const isAccessToken = !!accessToken;

  if (!user?.id || !isAccessToken) {
    redirect("/sign-in");
  }

  const isPostId = !!postId;

  if (!isPostId) {
    throw Error("投稿の取得に失敗しました");
  }

  try {
    await prisma.like.create({
      data: {
        user_id: user.id,
        post_id: postId,
      },
    });
  } catch (error) {
    throw Error("いいねに失敗しました");
  }

  revalidatePath("/");
  redirect("/");
};
