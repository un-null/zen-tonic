"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Client } from "@notionhq/client";
import { z } from "zod";

import { getAccessToken } from "@/lib/auth/getAccessToken";

import { prisma } from "../../prisma";

// Todo review key name
const schema = z.object({
  project: z.string().min(1, { message: "プロジェクトを選択してください" }),
  done: z.string().nullable(),
  comment: z.string().optional(),
});

type SchemaType = z.infer<typeof schema>;

export type State = {
  errors?: {
    [K in keyof SchemaType]?: string[];
  };
  message?: string | null;
};

export async function createPost(state: State, formData: FormData) {
  const validatedFields = schema.safeParse({
    project: formData.get("project"),
    done: formData.get("done"),
    comment: formData.get("comment"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "必要項目が不足しています",
    };
  }

  const { project, done, comment } = validatedFields.data;

  const user = await currentUser();
  const accessToken = await getAccessToken(user?.id);
  const { projectId, databaseId } = await getProject(project);

  const isDone = !!done;
  const isDatabaseId = !!databaseId;
  const isAccessToken = !!accessToken;

  if (!user?.id || !isAccessToken) {
    redirect("/sign-in");
  }

  if (!isDatabaseId) {
    throw Error("プロジェクトの取得に失敗しました");
  }

  try {
    await createNotionPage({
      databaseId: databaseId,
      isDone,
      comment: comment || "",
      accessToken,
    });

    await prisma.post.create({
      data: {
        content: comment || "",
        user_id: user.id || "",
        project_id: projectId || "",
        is_done: isDone,
      },
    });
  } catch (error) {
    throw Error("投稿の作成に失敗しました。");
  }

  revalidatePath("/");
  redirect("/");
}

// Fix refactor
const getProject = async (title: string = "") => {
  const project = await prisma.project.findFirst({
    where: {
      title,
    },
  });

  return {
    projectId: project?.id,
    databaseId: project?.database_id,
  };
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
              content: "",
            },
          },
          {
            mention: {
              template_mention: {
                type: "template_mention_date",
                template_mention_date: "today",
              },
              date: {
                start: new Date().toISOString().substring(0, 10),
              },
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
