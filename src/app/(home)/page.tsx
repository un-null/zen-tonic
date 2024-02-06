import { currentUser } from "@clerk/nextjs";
import { Avatar, Box, Card, Flex, TabsPanel, Text } from "@mantine/core";

import { prisma } from "@/lib/prisma";

import Tab from "./home-tab";
import NoPostCard from "./no-post-card";

export default async function Home() {
  const user = await currentUser();

  // promise All
  const AllPosts = await prisma.post.findMany({
    orderBy: { created_at: "desc" },
    // take: 10,
  });

  const userLatestPost = await prisma.post.findFirst({
    where: {
      user_id: user?.id,
    },
    orderBy: { created_at: "desc" },
    // take: 1
  });

  const isCompleteTask = userLatestPost!.created_at === new Date();

  return (
    <Tab>
      <Box my={40}>
        <TabsPanel value="all">
          {!userLatestPost ? (
            <NoPostCard />
          ) : userLatestPost.created_at.getDate() !== new Date().getDate() ? (
            <NoPostCard />
          ) : null}

          {AllPosts.map((post) => (
            <Card
              key={post.id}
              mx={"auto"}
              padding="lg"
              radius={0}
              style={{
                // borderTop: "1px solid #C9C9C9",
                borderBottom: "1px solid #C9C9C9",
              }}
            >
              <Flex gap={16}>
                <Avatar size={"md"} radius={"sm"} src={user?.imageUrl}></Avatar>

                <Flex direction={"column"} gap={8}>
                  <Text size="sm" c={"dimmed"}>
                    {"@" + user?.firstName}
                  </Text>
                  <Text size="sm">{post.content}</Text>
                </Flex>
              </Flex>
            </Card>
          ))}
        </TabsPanel>
        <TabsPanel value="friends">
          <NoPostCard />
        </TabsPanel>
      </Box>
    </Tab>
  );
}
