import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import {
  Box,
  Button,
  Card,
  Flex,
  Group,
  Avatar as MantineAvatar,
  Text,
  Title,
} from "@mantine/core";
import dayjs from "dayjs";
import { CheckSquare2 } from "lucide-react";

import { getFolloweeAllPosts } from "@/lib/db/post";

import Avatar from "../_components/avatar";
import CraeteButton from "../_components/create-button";
import LikeButton from "../_components/like-button";
import NoPostCard from "../_components/no-post-card";
import PostMenu from "../_components/post-menu";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const followeesAllPosts = await getFolloweeAllPosts(user.id);

  return (
    <Box my={20}>
      <NoPostCard>
        <CraeteButton type={"text"} />
      </NoPostCard>

      {followeesAllPosts.map((post) => (
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
            <Avatar
              image={post.user.image}
              title={post.project.title}
              start={post.project.start_date}
            >
              <Flex justify={"space-between"}>
                <Group gap={8}>
                  <MantineAvatar
                    size={32}
                    radius={"sm"}
                    src={post.user.image}
                  />
                  <Title order={3}>{post.user.name}</Title>
                </Group>
                {user.id !== post.user.id && (
                  <Button size={"xs"} disabled>
                    すでに友達です
                  </Button>
                )}
              </Flex>
            </Avatar>

            <Flex direction={"column"} gap={8} flex={1}>
              <Flex align={"center"}>
                <Group flex={1} c={"dimmed"} gap={"xs"}>
                  <Text size="sm">{`@${post.user.name}`}</Text>
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

              <Box mt={8}>
                <LikeButton isLike={post.like.length !== 0} postId={post.id} />
              </Box>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Box>
  );
}
