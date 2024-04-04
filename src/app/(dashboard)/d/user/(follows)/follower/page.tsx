import Link from "next/link";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Anchor, Avatar, Box, Card, Flex } from "@mantine/core";

import NoPostCard from "@/app/(home)/_components/no-post-card";
import { getFollowerList } from "@/lib/db/follow";

export default async function Follower() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const followers = await getFollowerList(user.id);

  const isFollower = followers?.length !== 0;

  return (
    <>
      {!isFollower ? (
        <NoPostCard type={"dashboard"}>まだフォロワーがいません</NoPostCard>
      ) : (
        <Box>
          {followers?.map((user) => (
            <Card
              mx={"auto"}
              key={user.follower.id}
              padding="lg"
              radius={0}
              style={{
                borderBottom: "1px solid #C9C9C9",
              }}
            >
              <Flex gap={16} align={"center"}>
                <Avatar size={"md"} radius={"sm"} src={user.follower.image} />

                <Anchor
                  size="md"
                  fw={"bold"}
                  flex={1}
                  component={Link}
                  href={`/d/user/${user.follower.id}`}
                >
                  {user.follower.name}
                </Anchor>
              </Flex>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
}
