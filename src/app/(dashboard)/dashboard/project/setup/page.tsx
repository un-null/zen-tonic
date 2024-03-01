import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Container } from "@mantine/core";
import { Client } from "@notionhq/client";

import { getAccessToken } from "@/lib/auth/getAccessToken";

import SetupForm from "./setup-form";

export default async function Setup() {
  const user = await currentUser();
  const accessToken = await getAccessToken(user?.id);

  const isAccessToken = !!accessToken;

  if (!user?.id || !isAccessToken) {
    redirect("/sign-in");
  }

  const integratedData = await retrieveIntegratedData(accessToken);

  return (
    <Container size={"md"}>
      <SetupForm data={integratedData} />
    </Container>
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
