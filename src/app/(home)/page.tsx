import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Avatar, Box, Card, Flex, Group, Text } from "@mantine/core";
import dayjs from "dayjs";
import { CheckSquare2 } from "lucide-react";

import { getAllPosts, getUserLatestPosts } from "@/lib/db/post";
import { getProjectTitles } from "@/lib/db/project";

import CraeteButton from "./_components/create-button";
import FixedButton from "./_components/fixed-button";
import NoPostCard from "./_components/no-post-card";
import PostMenu from "./_components/post-menu";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const [projectTitles, latestPost, allPosts] = await Promise.all([
    getProjectTitles(user.id),
    getUserLatestPosts(user.id),
    getAllPosts(),
  ]);

  const projectTitleArr = projectTitles.map((project) => project.title);

  const isPostedToday =
    latestPost?.created_at.getDate() !== new Date().getDate();

  return (
    <Box my={20}>
      {!latestPost ? (
        <NoPostCard>
          <CraeteButton type={"text"} projects={projectTitleArr} />
        </NoPostCard>
      ) : isPostedToday ? (
        <NoPostCard>
          <CraeteButton type={"text"} projects={projectTitleArr} />
        </NoPostCard>
      ) : null}

      {allPosts.map((post) => (
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

      {/* Fix props and isPostedToday branch */}
      <FixedButton>
        {isPostedToday ? (
          <CraeteButton
            projects={projectTitleArr}
            type={"button"}
            username={user.firstName}
            avatar={user.imageUrl}
          />
        ) : (
          <CraeteButton
            projects={projectTitleArr}
            isDone
            type={"button"}
            username={user.firstName}
            avatar={user.imageUrl}
          />
        )}
      </FixedButton>
    </Box>
  );
}
