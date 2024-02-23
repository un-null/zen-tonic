import { clerkClient } from "@clerk/nextjs";

export const getAccessToken = async (userId: string = "") => {
  const tokenData = await clerkClient.users.getUserOauthAccessToken(
    userId,
    "oauth_notion",
  );
  return tokenData[0].token;
};
