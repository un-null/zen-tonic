"use server";

import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Client } from "@notionhq/client";
import dayjs, { Dayjs } from "dayjs";

import "dayjs/locale/ja";

import { revalidatePath } from "next/cache";

import { z } from "zod";

import { getAccessToken } from "@/lib/auth/getAccessToken";
import { prisma } from "@/lib/prisma";

dayjs.locale("ja");

const schema = z.object({
  title: z.string().min(1, { message: "タイトルを入力してください" }),
  object: z.string(),
  id: z.string(),
  numberOfWeek: z.enum(["4", "8"]),
  weekDayOption: z.enum(["毎日", "カスタム"]),
  weekDays: z.string().array(),
  _if: z.string(),
  then: z.string(),
});

type SchemaType = z.infer<typeof schema>;
type SchemaKey = keyof SchemaType;

export type State = {
  errors?: {
    [K in SchemaKey]?: string[];
  };
  message?: string;
};

export async function createProject(prevState: State, formData: FormData) {
  const validatedFields = schema.safeParse({
    title: formData.get("title"),
    numberOfWeek: formData.get("numberOfWeek"),
    object: formData.get("object"),
    id: formData.get("id"),
    weekDayOption: formData.get("weekDayOption"),
    weekDays: formData.getAll("weekDays[]"),
    _if: formData.get("_if"),
    then: formData.get("then"),
  });

  if (!validatedFields.success) {
    return {
      message: "プロジェクトの作成に失敗しました",
    };
  }

  const {
    title,
    numberOfWeek,
    weekDayOption,
    weekDays,
    _if,
    then,
    id,
    object,
  } = validatedFields.data;

  const user = await currentUser();
  const accessToken = await getAccessToken(user?.id);

  const isAccessToken = !!accessToken;

  if (!user?.id || !isAccessToken) {
    redirect("/sign-in");
  }

  const startDate = dayjs();
  const endDate = startDate.add(7 * Number(numberOfWeek), "day").endOf("day");

  const totalDate = getTotalDays({ startDate, endDate, weekDays });

  const weekDayValue =
    weekDayOption === "毎日" || weekDays.length === 7
      ? "毎日"
      : weekDays.join(",");

  try {
    let notionId: string | undefined = undefined;

    if (object === "page") {
      const notionDb = await createNotionDb({ pageId: id, title, accessToken });
      notionId = notionDb.id;
    }

    const duplicateProject = await prisma.project.findFirst({
      where: {
        id: notionId ? notionId : id,
      },
      select: {
        title: true,
      },
    });
    if (duplicateProject) {
      return {
        error: { id: ["すでに登録済みのデータベースです"] },
        message: "プロジェクトの作成に失敗しました",
      };
    } else {
      await prisma.project.create({
        data: {
          title,
          start_date: startDate.toDate(),
          end_date: endDate.toDate(),
          total_date: totalDate,
          week_days: weekDayValue,
          database_id: notionId ? notionId : id,
          user_id: user.id,
          if_then: _if + then || "",
        },
      });
    }
  } catch (error) {
    throw Error("エラーが発生しました");
  }

  revalidatePath("/d/project");
  redirect("/d/project");
}

const getTotalDays = ({
  startDate,
  endDate,
  weekDays,
}: {
  startDate: Dayjs;
  endDate: Dayjs;
  weekDays: string[];
}) => {
  if (weekDays.length === 0) {
    weekDays = ["月", "火", "水", "木", "金", "土", "日"];
  }

  return Array.from({ length: endDate.diff(startDate, "day") + 1 }, (_, i) =>
    startDate.add(i, "day"),
  ).filter((day) => weekDays.includes(day.format("dd"))).length;
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
