import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Avatar, Box, Card, Flex, Group, Text } from "@mantine/core";
import dayjs from "dayjs";

import NoPostCard from "@/app/(home)/_components/no-post-card";
import { getFollowsRequest } from "@/lib/db/follow";

import RequestButtons from "./request-buttons";

export default async function Notice() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const followRequests = await getFollowsRequest(user.id);

  const isFollowRequest = followRequests.length !== 0;

  return (
    <>
      {!isFollowRequest ? (
        <NoPostCard type={"dashboard"}>友達申請がまだ届いていません</NoPostCard>
      ) : (
        <Box>
          <Card mx={"auto"} padding="lg" radius={0}>
            {followRequests.map((req) => (
              <Flex
                gap={16}
                key={req.id}
                pb={16}
                style={{
                  borderBottom: "1px solid #C9C9C9",
                }}
              >
                <Avatar size={"md"} radius={"sm"} src={req.follower.image} />

                <Flex direction={"column"} gap={8} flex={1}>
                  <Flex align={"center"}>
                    <Group flex={1} c={"dimmed"} gap={"xs"}>
                      <Text size="sm">{`@${req.follower.name}`}</Text>
                      <Text size="xs">
                        {dayjs("2024-03-09").format("YYYY.MM.DD")}
                      </Text>
                    </Group>
                  </Flex>

                  <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                    {req.follower.name} さんが友達申請をしました
                  </Text>
                  <RequestButtons id={req.id} />
                </Flex>
              </Flex>
            ))}
          </Card>
        </Box>
      )}
    </>
  );
}
