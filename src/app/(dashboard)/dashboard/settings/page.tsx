import {
  Avatar,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Text,
  Title,
} from "@mantine/core";
import { Calendar, Clipboard } from "lucide-react";

export default async function Settings() {
  const items = [
    {
      icon: <Calendar size={16} />,
      name: "開始日",
      data: "テスト!",
    },
    {
      icon: <Clipboard size={16} />,
      name: "進行中",
      data: "テスト!!",
    },
  ];

  return (
    <Box mt={32}>
      <Box h={120} bg={"gray.4"}></Box>
      <Box px={{ base: 16, md: 32 }}>
        <Avatar mt={-36} src={""} w={72} h={72} radius={"xs"} />

        <Flex
          direction={"column"}
          mt={32}
          pb={32}
          gap={16}
          style={{ borderBottom: "1px solid #CDCDCD" }}
        >
          <Title order={2}>{`username`}</Title>
          <Flex direction={"column"} gap={8}>
            {items.map((item) => (
              <Flex key={item.name} gap={16}>
                <Group
                  gap={4}
                  display={"inline-flex"}
                  style={{ alignItems: "center" }}
                  fz={{ base: 14, md: 16 }}
                >
                  {item.icon}
                  {item.name}
                </Group>
                <Text fz={{ base: 14, md: 16 }}>{item.data}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Box>
      <Box mt={16} px={{ base: 16, md: 32 }}>
        <Card withBorder radius="xs" padding="md">
          <Text fw={"bold"}>アカウントの削除</Text>

          <Text pt={8} fz={{ base: 14, md: 16 }} c={"dimmed"}>
            Zen-Tonic のアカウントが削除されます。
            <br />
            Notionのアカウントは削除されません。
          </Text>

          <Box mt={16}>
            <Button variant={"outline"} color={"#e06259"}>
              削除
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
