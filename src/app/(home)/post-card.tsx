import { Avatar, Card, Flex, Text } from "@mantine/core";

export default function PostCard() {
  return (
    <Card
      mx={"auto"}
      padding="lg"
      radius={0}
      style={{
        // borderTop: "1px solid #C9C9C9",
        borderBottom: "1px solid #C9C9C9",
      }}
    >
      <Flex gap={16}>
        <Avatar size={"md"} radius={"sm"} />

        <Flex direction={"column"} gap={8}>
          <Text size="sm" c={"dimmed"}>
            @username
          </Text>
          <Text size="sm">contents</Text>
        </Flex>
      </Flex>
    </Card>
  );
}
