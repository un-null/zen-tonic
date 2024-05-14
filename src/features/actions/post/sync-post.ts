"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { Client } from "@notionhq/client";

import { getAccessToken } from "@/features/lib/auth/getAccessToken";
import { prisma } from "@/features/lib/prisma";

export const syncNotion = async (userId: string) => {
  try {
    const dbInfo = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        project: {
          orderBy: { start_date: "desc" },
          select: {
            id: true,
            database_id: true,
          },
        },
        post: true,
      },
    });

    const accessToken = await getAccessToken(userId);
    const databaseId = dbInfo?.project[0].database_id
      ? dbInfo.project[0].database_id
      : "";

    const latestNotionData = await getLatestNotionData({
      databaseId,
      accessToken,
    });

    // notion DB にあって、turso にないデータがあれば、turso へインサート
    const filterdInsertData = latestNotionData.filter(
      (data) =>
        !dbInfo?.post.some((post) => {
          if (data.object === "page" && "properties" in data) {
            return new Date(data.created_time) === post.created_at;
          }
        }),
    );

    const insertData = filterdInsertData.map((data) => {
      if (data.object === "page" && "properties" in data) {
        const comment =
          data.properties["Comment"].type === "rich_text" &&
          data.properties["Comment"].rich_text[0].plain_text;
        const created_at = new Date(data.created_time);
        const isDone =
          data.properties["Done"].type === "checkbox" &&
          data.properties["Done"].checkbox;

        return {
          comment: comment,
          created_at: created_at,
          isDone,
        };
      }
    });

    if (insertData !== undefined && insertData.length !== 0) {
      for (const item of insertData) {
        await prisma.post.create({
          data: {
            content: item?.comment || "",
            user_id: userId,
            project_id: dbInfo?.project[0].id!,
            created_at: item?.created_at!,
            is_done: item?.isDone || false,
          },
        });
      }
    }

    // turso にしかないデータの id　配列を抽出し、 turso 側でデリートする
    const deleteDataIds = dbInfo?.post
      .filter(
        (post) =>
          !latestNotionData.some((data) => {
            if (data.object === "page" && "properties" in data) {
              return new Date(data.created_time) === post.created_at;
            }
          }),
      )
      .map((data) => data.id);

    if (deleteDataIds !== undefined && deleteDataIds.length !== 0) {
      await prisma.post.deleteMany({ where: { id: { in: deleteDataIds } } });
    }

    // sync_notion db にレコード追加
    await prisma.notion_Sync.create({
      data: {
        user_id: userId,
      },
    });

    revalidatePath("/d/settings");
    redirect("/d/settings");
  } catch (error) {
    throw Error("エラーが発生しました");
  }
};

const getLatestNotionData = async ({
  databaseId,
  accessToken,
}: {
  databaseId: string;
  accessToken: string;
}) => {
  const notion = new Client({
    auth: accessToken,
  });

  const data = await notion.databases.query({
    database_id: databaseId,
  });

  return data.results;
};
