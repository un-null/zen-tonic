import Link from "next/link";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Button, Text, Title } from "@mantine/core";
import { Client } from "@notionhq/client";

import { getAccessToken } from "@/lib/auth/getAccessToken";
import { prisma } from "@/lib/prisma";
import c from "@/styles/page/setup.module.css";

import SetupForm from "./setup-form";

export default async function Setup() {
  const user = await currentUser();
  const accessToken = await getAccessToken(user?.id);

  const isAccessToken = !!accessToken;

  if (!user?.id || !isAccessToken) {
    redirect("/sign-in");
  }

  const projects = await prisma.project.findMany({
    where: {
      user_id: user?.id,
    },
  });

  const inProgressProjects = projects.filter(
    (project) => project.end_date >= new Date(),
  );

  const hasInProgressProjects = inProgressProjects.length !== 0;

  const integratedData = await retrieveIntegratedData(accessToken);

  return (
    <div className={c.container}>
      {!hasInProgressProjects ? (
        <>
          <div className={c.content}>
            <Title order={3}>プロジェクトを作成</Title>
            <Text size={"sm"} mt={16}>
              習慣にしたいことを決めてみましょう！
            </Text>
          </div>

          <SetupForm data={integratedData} />
        </>
      ) : (
        <div className={c.back_content}>
          <Title order={3} c={"#2483e2"}>
            現在進行中のプロジェクトがあります
          </Title>

          <Text size={"sm"}>
            複数のプロジェクトを作成したい場合は、有料版へのアップグレードが必要です
          </Text>

          <Button component={Link} href={"/d/project"}>
            プロジェクト一覧に戻る
          </Button>
        </div>
      )}
    </div>
  );
}

const retrieveIntegratedData = async (accessToken: string) => {
  const notion = new Client({
    auth: accessToken,
  });

  const filteredSerchResults = (await notion.search({})).results.filter(
    (result) => {
      if ("parent" in result) {
        return result.parent.type === "workspace";
      }
    },
  );

  return filteredSerchResults.map((result) => {
    switch (result.object) {
      case "page":
        if ("properties" in result) {
          return {
            id: result.id,
            object: result.object,
            title:
              result.properties["title"].type === "title"
                ? result.properties["title"].title[0].plain_text
                : "",
          };
        }
      case "database":
        if ("title" in result) {
          return {
            id: result.id,
            object: result.object,
            title: result.title[0].plain_text,
            properties: result.properties,
          };
        }
      default:
        throw Error("データの取得に失敗しました");
    }
  });
};
