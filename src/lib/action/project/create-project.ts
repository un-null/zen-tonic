"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Client } from "@notionhq/client";
import dayjs, { Dayjs } from "dayjs";
import { z } from "zod";

import { getAccessToken } from "@/lib/auth/getAccessToken";

import { prisma } from "../../prisma";

// Todo review key name
const schema = z.object({
  title: z.string().min(1, { message: "タイトルを入力してください" }),
  object: z.string(),
  id: z.string(),
  numberOfWeek: z.enum(["4", "8"]),
  weekDays: z.string().array(),
  _if: z.string(),
  then: z.string(),
});

export async function createProject(formData: FormData) {
  const validatedFields = schema.safeParse({
    title: formData.get("title"),
    numberOfWeek: formData.get("numberOfWeek"),
    object: formData.get("object"),
    id: formData.get("id"),
    weekDays: formData.getAll("weekDays[]"),
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

  const { title, numberOfWeek, weekDays, _if, then, id, object } =
    validatedFields.data;

  const user = await currentUser();
  const accessToken = await getAccessToken(user?.id);

  const startDate = dayjs();
  const endDate = startDate.add(7 * Number(numberOfWeek), "day").endOf("day");

  // Todo: fix
  const totalDate = getTotalDays({ startDate, endDate, weekDays });

  try {
    let notionId: string | undefined = undefined;

    if (object === "page") {
      const notionDb = await createNotionDb({ pageId: id, title, accessToken });
      notionId = notionDb.id;
    }

    await prisma.project.create({
      data: {
        title,
        start_date: startDate.toDate(),
        end_date: endDate.toDate(),
        total_date: totalDate,
        week_days: weekDays.join(","),
        database_id: notionId ? notionId : id,
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

// Todo: rewrite reduce ???
const getTotalDays = ({
  startDate,
  endDate,
  weekDays,
}: {
  startDate: Dayjs;
  endDate: Dayjs;
  weekDays: string[];
}) => {
  return Array.from({ length: endDate.diff(startDate, "day") + 1 }, (_, i) =>
    startDate.add(i, "day"),
  ).filter((day) => weekDays.includes(day.format("ddd"))).length;
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
