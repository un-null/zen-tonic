import { Suspense } from "react";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Avatar, Box, Card, Flex, TabsPanel, Text } from "@mantine/core";

import { prisma } from "@/lib/prisma";

import Tab from "./_components/home-tab";
import NoPostCard from "./_components/no-post-card";
import PostMenu from "./_components/post-menu";
import Loading from "./loading";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // promise All + remove waste fetch
  const AllPosts = await prisma.post.findMany({
    orderBy: { created_at: "desc" },
  });

  const userLatestPost = await prisma.post.findFirst({
    where: {
      user_id: user.id,
    },
    orderBy: { created_at: "desc" },
  });

  // Fix remove waste featch maybe
  const projects = await prisma.project.findMany({
    where: {
      user_id: user.id,
    },
  });

  const projectTitleArr = projects.map((project) => project.title);

  const isPostedToday =
    userLatestPost?.created_at.getDate() !== new Date().getDate();

  return (
    <Tab>
      <Suspense fallback={<Loading />}>
        <Box my={40}>
          <TabsPanel value="all">
            {!userLatestPost ? (
              <NoPostCard projects={projectTitleArr} />
            ) : isPostedToday ? (
              <NoPostCard projects={projectTitleArr} />
            ) : null}

            {AllPosts.map((post) => (
              <Card
                key={post.id}
                mx={"auto"}
                padding="lg"
                radius={0}
                style={{
                  borderBottom: "1px solid #C9C9C9",
                }}
              >
                <Flex gap={16}>
                  <Avatar size={"md"} radius={"sm"} src={user.imageUrl} />

                  <Flex direction={"column"} gap={8} flex={1}>
                    <Flex align={"center"}>
                      <Text flex={1} size="sm" c={"dimmed"}>
                        {"@" + user.firstName}
                      </Text>
                      <PostMenu postId={post.id} />
                    </Flex>

                    <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                      {post.content}
                    </Text>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </TabsPanel>
          <TabsPanel value="friends">
            <NoPostCard projects={projectTitleArr} />
          </TabsPanel>
        </Box>
      </Suspense>
    </Tab>
  );
}
