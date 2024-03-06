import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Avatar, Box, Card, Flex, Group, Text } from "@mantine/core";
import dayjs from "dayjs";
import { CheckSquare2 } from "lucide-react";

import { prisma } from "@/lib/prisma";

import NoPostCard from "./_components/no-post-card";
import PostMenu from "./_components/post-menu";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // promise All + remove waste fetch
  const AllPosts = await prisma.post.findMany({
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      created_at: true,
      content: true,
      project: {
        select: {
          title: true,
          start_date: true,
        },
      },
    },
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
    <Box my={20}>
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
                <Group flex={1} c={"dimmed"} gap={"xs"}>
                  <Text size="sm">{`@${user.firstName}`}</Text>
                  <Text size="xs">
                    {dayjs(post.created_at).format("YYYY.MM.DD")}
                  </Text>
                </Group>

                <PostMenu postId={post.id} />
              </Flex>

              <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                {post.content}
              </Text>

              <Flex
                direction={"column"}
                gap={4}
                p={12}
                style={{
                  whiteSpace: "pre-wrap",
                  border: "1px solid #C9C9C9",
                  borderRadius: 4,
                }}
              >
                <Text size="sm" fw={"bold"}>
                  {post.project.title}
                </Text>
                <Group gap={4} mt={8} pl={2} c={"dimmed"}>
                  <CheckSquare2 size={14} />
                  <Text size="xs">Done</Text>
                </Group>

                {/* Fix spec  */}
                <Box mt={4} ml={2}>
                  <Text
                    size="xs"
                    py={3}
                    px={6}
                    bg={"#DDEBF1"}
                    display={"inline"}
                    style={{ borderRadius: 4 }}
                  >
                    {`${dayjs(post.created_at).diff(post.project.start_date, "day")}日継続中`}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      ))}

      <Card
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
              <Group flex={1} c={"dimmed"} gap={"xs"}>
                <Text size="sm">{`@${user.firstName}`}</Text>
                <Text size="xs">
                  {/* {dayjs(post.created_at).format("YYYY.MM.DD")} */}
                  YYYY.MM.DD
                </Text>
              </Group>

              <PostMenu postId={""} />
            </Flex>

            <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
              Test Test
            </Text>

            <Flex
              direction={"column"}
              gap={4}
              p={12}
              style={{
                whiteSpace: "pre-wrap",
                border: "1px solid #C9C9C9",
                borderRadius: 4,
              }}
            >
              <Text size="sm" fw={"bold"}>
                Title
              </Text>
              <Group gap={4} mt={8} pl={2} c={"dimmed"}>
                <CheckSquare2 size={14} />
                <Text size="xs">Done</Text>
              </Group>

              {/* Fix spec  */}
              <Box mt={4} ml={2}>
                <Text
                  size="xs"
                  py={3}
                  px={6}
                  bg={"#DDEBF1"}
                  display={"inline"}
                  style={{ borderRadius: 4 }}
                >
                  {/* {`${dayjs(post.created_at).diff(post.project.start_date, "day")}日継続中`} */}
                  x 日継続中
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
