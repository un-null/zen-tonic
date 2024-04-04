import { currentUser } from "@clerk/nextjs";
import { Avatar, Box, Card, Flex, Group, Text } from "@mantine/core";
import dayjs from "dayjs";

import NoPostCard from "@/app/(home)/_components/no-post-card";
import { getAllLikes } from "@/lib/db/like";

export default async function Notice() {
  const user = await currentUser();

  const allLikes = await getAllLikes(user?.id);

  const isAllLikes = allLikes.length !== 0;

  return (
    <>
      {!isAllLikes ? (
        <NoPostCard type={"dashboard"}>いいねがまだ届いていません</NoPostCard>
      ) : (
        <Box>
          {allLikes.map((like) => (
            <Card
              mx={"auto"}
              key={like.id}
              padding="lg"
              radius={0}
              style={{
                borderBottom: "1px solid #C9C9C9",
              }}
            >
              <Flex gap={16}>
                <Avatar size={"md"} radius={"sm"} src={like.user.image} />

                <Flex direction={"column"} gap={8} flex={1}>
                  <Flex align={"center"}>
                    <Group flex={1} c={"dimmed"} gap={"xs"}>
                      <Text size="sm">{`@${like.user.name}`}</Text>
                      <Text size="xs">
                        {dayjs(like.created_at).format("YYYY.MM.DD")}
                      </Text>
                    </Group>
                  </Flex>

                  <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                    {like.user.name} さんがあなたの投稿にいいねをしました
                  </Text>
                </Flex>
              </Flex>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
}
