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

  return (await notion.search({})).results
    .filter((result: any) => result.parent?.type === "workspace")
    .map((data: any) => {
      return {
        id: data?.id,
        object: data?.object,
        title: data?.title
          ? data.title[0]?.plain_text
          : data.properties?.title.title[0].plain_text,
        properties: data.properties,
      };
    });
};
