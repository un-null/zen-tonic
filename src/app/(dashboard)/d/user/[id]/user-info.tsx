import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Avatar, Box, Flex, Group, Title } from "@mantine/core";

import { getFollowById } from "@/lib/db/follow";
import { getPostsByUserId } from "@/lib/db/post";

import FollowButton from "../follow-button";

export default async function UserDetailInfo({ id }: { id: string }) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fix posts
  const posts = await getPostsByUserId(id);

  const follow = await getFollowById(user.id, id);

  console.log(follow?.follower_id);
  console.log(follow?.followee_id);
  console.log(user.id);

  return (
    <>
      <Box h={120} bg={"gray.4"} />
      <Box px={{ base: 16, md: 32 }}>
        <Avatar
          mt={-36}
          src={posts[0].user.image}
          w={72}
          h={72}
          radius={"xs"}
        />

        <Flex direction={"column"} mt={32} pb={32} gap={16}>
          <Group
            pb={16}
            style={{
              borderBottom: "1px solid #C9C9C9",
            }}
          >
            <Title order={2}>{posts[0].user.name}</Title>
            {follow ? (
              !follow.status ? (
                <FollowButton type={"unfollow"} follow={follow!}>
                  友達申請
                </FollowButton>
              ) : (
                <FollowButton type={"follow"} follow={follow}>
                  フォロー解除
                </FollowButton>
              )
            ) : null}
          </Group>
        </Flex>
      </Box>
    </>
  );
}
