import { clerkClient, currentUser } from "@clerk/nextjs";
import { Container } from "@mantine/core";
import { Client } from "@notionhq/client";

import SetupForm from "./setup-form";

const getAccessToken = async (userId: string = "") => {
  const tokenData = await clerkClient.users.getUserOauthAccessToken(
    userId,
    "oauth_notion",
  );
  return tokenData[0].token;
};

const retrieveIntegratedData = async (accessToken: string = "") => {
  const notion = new Client({
    auth: accessToken,
  });

  return (await notion.search({})).results
    .filter((result: any) => result.parent.type === "workspace")
    .map((data: any) => {
      return {
        id: data.id,
        object: data.object,
        title: data.title
          ? data.title[0].plain_text
          : data.properties.title.title[0].plain_text,
        properties: data.properties,
      };
    });
};

export default async function Setup() {
  const user = await currentUser();
  const accessToken = await getAccessToken(user?.id);

  const integratedData = await retrieveIntegratedData(accessToken);

  return (
    <Container size={"md"} p={16}>
      <SetupForm data={integratedData} />
    </Container>
  );
}
