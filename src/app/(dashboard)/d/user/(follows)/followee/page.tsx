import Link from "next/link";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Anchor, Avatar, Box, Card, Flex } from "@mantine/core";

import NoPostCard from "@/app/(home)/_components/no-post-card";
import { getFolloweeList } from "@/lib/db/follow";

export default async function Followee() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const followees = await getFolloweeList(user.id);

  const isFollowee = followees?.length !== 0;

  return (
    <>
      {!isFollowee ? (
        <NoPostCard type={"dashboard"}>まだ誰もフォローしていません</NoPostCard>
      ) : (
        <Box>
          {followees?.map((user) => (
            <Card
              mx={"auto"}
              key={user.followee.id}
              padding="lg"
              radius={0}
              style={{
                borderBottom: "1px solid #C9C9C9",
              }}
            >
              <Flex gap={16} align={"center"}>
                <Avatar size={"md"} radius={"sm"} src={user.followee.image} />

                <Anchor
                  size="md"
                  fw={"bold"}
                  flex={1}
                  component={Link}
                  href={`/d/user/${user.followee.id}`}
                >
                  {user.followee.name}
                </Anchor>
              </Flex>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
}
