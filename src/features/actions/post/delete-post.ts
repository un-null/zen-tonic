"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Client } from "@notionhq/client";

import { getAccessToken } from "@/features/lib/auth/getAccessToken";
import { prisma } from "@/features/lib/prisma";

export const deletePost = async (postId: string) => {
  const user = await currentUser();
  const accessToken = await getAccessToken(user?.id);

  const { createdAt, databaseId } = await getPostInfo(postId);
  const isCreatedAt = !!createdAt;
  const isDatabaseId = !!databaseId;
  const isAccessToken = !!accessToken;

  if (!user?.id || !isAccessToken) {
    redirect("/sign-in");
  }

  if (!isDatabaseId) {
    throw Error("プロジェクトの取得に失敗しました");
  }

  if (!isCreatedAt) {
    throw Error("投稿の取得に失敗しました");
  }

  try {
    await deleteNotionPage({ databaseId, createdAt, accessToken });

    await prisma.post.deleteMany({
      where: {
        id: {
          in: [postId],
        },
      },
    });
  } catch (error) {
    throw Error("投稿の削除に失敗しました");
  }

  revalidatePath("/");
  redirect("/");
};

const getPostInfo = async (postId: string) => {
  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
    select: {
      created_at: true,
      project: {
        select: {
          database_id: true,
        },
      },
    },
  });

  return {
    createdAt: post?.created_at.toISOString(),
    databaseId: post?.project.database_id,
  };
};

const deleteNotionPage = async ({
  databaseId,
  createdAt,
  accessToken,
}: {
  databaseId: string;
  createdAt: string;
  accessToken: string;
}) => {
  const notion = new Client({
    auth: accessToken,
  });

  const pageData = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Date",
      date: {
        equals: createdAt,
      },
    },
  });

  return await notion.pages.update({
    page_id: pageData.results[0].id,
    archived: true,
  });
};
