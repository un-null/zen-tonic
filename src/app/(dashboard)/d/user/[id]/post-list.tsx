import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Avatar, Box, Card, Flex, Group, Text } from "@mantine/core";
import dayjs from "dayjs";
import { CheckSquare2 } from "lucide-react";

import LikeButton from "@/app/(home)/_components/like-button";
import { getPostsByUserId } from "@/lib/db/post";

export default async function PostList({ id }: { id: string }) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const posts = await getPostsByUserId(id);

  return (
    <Box>
      {posts.map((post) => (
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
            <Avatar size={32} radius={"sm"} src={post.user.image} />

            <Flex direction={"column"} gap={8} flex={1}>
              <Flex align={"center"}>
                <Group flex={1} c={"dimmed"} gap={"xs"}>
                  <Text size="sm">{`@${post.user.name}`}</Text>
                  <Text size="xs">
                    {dayjs(post.created_at).format("YYYY.MM.DD")}
                  </Text>
                </Group>
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
