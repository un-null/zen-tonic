"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { clerkClient, currentUser } from "@clerk/nextjs";
import { Client } from "@notionhq/client";
import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

import { prisma } from "../prisma";

// Todo review key name
const schema = z.object({
  pageUrl: z
    .string()
    .min(1, { message: "URL を入力してください" })
    .url({ message: "正しいURL形式で入力してください" }),
  title: z.string().min(1, { message: "タイトルを入力してください" }),
  numberOfWeek: z.enum(["4", "8"]),
  daysOfWeek: z.string().array(),
  _if: z.string(),
  then: z.string(),
});

export async function createInitialProject(formData: FormData) {
  const validatedFields = schema.safeParse({
    pageUrl: formData.get("pageUrl"),
    title: formData.get("title"),
    numberOfWeek: formData.get("numberOfWeek"),
    daysOfWeek: formData.getAll("daysOfWeek[]"),
    _if: formData.get("_if"),
    then: formData.get("then"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "必要項目が不足しています。プロジェクトの作成に失敗しました",
    };
  }

  const { pageUrl, title, numberOfWeek, daysOfWeek, _if, then } =
    validatedFields.data;

  const user = await currentUser();
  const accessToken = await getAccessToken(user?.id);
  const pageId = getPageId(pageUrl);

  const startDate = dayjs();
  const endDate = startDate.add(7 * Number(numberOfWeek), "day").endOf("day");

  // Todo: fix
  const totalDate = getTotalDays({ startDate, endDate, daysOfWeek });

  try {
    const notionDb = await createNotionDb({ pageId, title, accessToken });

    await prisma.user.update({
      where: {
        id: user?.id || "",
      },
      data: {
        name: user?.emailAddresses[0].emailAddress,
        database_id: notionDb.id,
      },
    });

    await prisma.project.create({
      data: {
        title,
        start_date: startDate.toDate(),
        end_date: endDate.toDate(),
        total_date: totalDate,
        days_of_week: JSON.stringify(daysOfWeek),
        user_id: user?.id || "",
        if_then: _if + then || "",
      },
    });
  } catch (error) {
    throw Error("エラーが発生しました");
  }

  revalidatePath("/");
  redirect("/");
}

const getPageId = (pageUrl: string) => {
  const parsedUrl = new URL(pageUrl);
  return parsedUrl.pathname.split("-")[1];
};

// Todo: rewrite reduce ???
const getTotalDays = ({
  startDate,
  endDate,
  daysOfWeek,
}: {
  startDate: Dayjs;
  endDate: Dayjs;
  daysOfWeek: string[];
}) => {
  return Array.from({ length: endDate.diff(startDate, "day") + 1 }, (_, i) =>
    startDate.add(i, "day"),
  ).filter((day) => daysOfWeek.includes(day.format("ddd"))).length;
};

const getAccessToken = async (userId: string = "") => {
  const tokenData = await clerkClient.users.getUserOauthAccessToken(
    userId,
    "oauth_notion",
  );
  return tokenData[0].token;
};

const createNotionDb = async ({
  pageId,
  title,
  accessToken,
}: {
  pageId: string;
  title: string;
  accessToken: string;
}) => {
  const notion = new Client({
    auth: accessToken,
  });

  return await notion.databases.create({
    parent: {
      type: "page_id",
      page_id: pageId,
    },
    title: [
      {
        type: "text",
        text: {
          content: title || "Test",
        },
      },
    ],
    properties: {
      Name: {
        type: "title",
        title: {},
      },
      Date: {
        type: "date",
        date: {},
      },
      Done: {
        type: "checkbox",
        checkbox: {},
      },
      Comment: {
        type: "rich_text",
        rich_text: {},
      },
    },
  });
};
