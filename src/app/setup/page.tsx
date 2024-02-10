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
    .filter((result) => result.parent.type === "workspace")
    .map((data) => {
      return {
        id: data.id,
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
