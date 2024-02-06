"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { clerkClient, currentUser } from "@clerk/nextjs";
import { Client } from "@notionhq/client";
import { z } from "zod";

import { prisma } from "../prisma";

// Todo review key name
const schema = z.object({
  project: z.string().min(1, { message: "プロジェクトを選択してください" }),
  done: z.string().nullable(),
  comment: z.string().optional(),
});

export async function createPost(formData: FormData) {
  const validatedFields = schema.safeParse({
    project: formData.get("project"),
    done: formData.get("done"),
    comment: formData.get("comment"),
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);

    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "必要項目が不足しています。プロジェクトの作成に失敗しました",
    };
  }

  const { project, done, comment } = validatedFields.data;

  const user = await currentUser();
  const accessToken = await getAccessToken(user?.id);
  const databaseId = await getDatabaseId(user?.id);
  const projectId = await getProjectId(project);

  const isDone = !!done;

  try {
    const notionDb = await createNotionPage({
      databaseId: databaseId!,
      isDone,
      comment: comment || "",
      accessToken,
    });

    await prisma.post.create({
      data: {
        content: comment || "",
        user_id: user?.id || "",
        project_id: projectId || "",
      },
    });
  } catch (error) {
    throw Error("エラーが発生しました");
  }

  revalidatePath("/");
  redirect("/");
}

const getDatabaseId = async (userId: string = "") => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user?.database_id;
};

// Fix refactor
const getProjectId = async (title: string = "") => {
  const project = await prisma.project.findFirst({
    where: {
      title,
    },
  });

  return project?.id;
};

const getAccessToken = async (userId: string = "") => {
  const tokenData = await clerkClient.users.getUserOauthAccessToken(
    userId,
    "oauth_notion",
  );
  return tokenData[0].token;
};

const createNotionPage = async ({
  databaseId,
  isDone,
  comment,
  accessToken,
}: {
  databaseId: string;
  isDone: boolean;
  comment: string;
  accessToken: string;
}) => {
  const notion = new Client({
    auth: accessToken,
  });

  return await notion.pages.create({
    parent: {
      type: "database_id",
      database_id: databaseId,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: "@Today",
            },
          },
        ],
      },
      Date: {
        type: "date",
        date: {
          start: new Date().toISOString(),
        },
      },
      Done: {
        type: "checkbox",
        checkbox: isDone,
      },
      Comment: {
        type: "rich_text",
        rich_text: [
          {
            type: "text",
            text: {
              content: comment,
            },
          },
        ],
      },
    },
  });
};
