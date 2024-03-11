import { Avatar, Box, Card, Flex, Group, Text } from "@mantine/core";
import dayjs from "dayjs";

export default async function Notice() {
  return (
    <Box>
      <Card
        mx={"auto"}
        padding="lg"
        radius={0}
        style={{
          borderBottom: "1px solid #C9C9C9",
        }}
      >
        <Flex gap={16}>
          <Avatar size={"md"} radius={"sm"} />

          <Flex direction={"column"} gap={8} flex={1}>
            <Flex align={"center"}>
              <Group flex={1} c={"dimmed"} gap={"xs"}>
                <Text size="sm">{`@user`}</Text>
                <Text size="xs">
                  {dayjs("2024-03-09").format("YYYY.MM.DD")}
                </Text>
              </Group>
            </Flex>

            <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
              user さんが友達申請をしました
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
}
