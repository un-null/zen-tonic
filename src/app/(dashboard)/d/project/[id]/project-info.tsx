import { ReactNode } from "react";

import { Avatar, Box, Flex, Group, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import {
  Calendar,
  Clipboard,
  CopyCheck,
  Repeat2,
  StickyNote,
} from "lucide-react";

import { getProjectDetail } from "@/lib/db/project";

type CardItem = {
  icon: ReactNode;
  label: string;
  content?: string;
  href?: string;
};

export default async function ProjectInfo({ id }: { id: string }) {
  const project = await getProjectDetail(id);

  const startDate = project?.start_date.toISOString().substring(0, 10);
  const endDate = project?.end_date.toISOString().substring(0, 10);

  const cardItems = [
    {
      icon: <Calendar size="1rem" style={{ marginRight: 8 }} />,
      label: "期間",
      content: `${dayjs(startDate).format("YYYY.MM.DD")} - ${dayjs(endDate).format("YYYY.MM.DD")}`,
    },
    {
      icon: <CopyCheck size="1rem" style={{ marginRight: 8 }} />,
      label: "日数",
      content: String(project?.total_date),
    },
    {
      icon: <Repeat2 size="1rem" style={{ marginRight: 8 }} />,
      label: "頻度",
      content: project?.week_days,
    },
    {
      icon: <StickyNote size="1rem" style={{ marginRight: 8 }} />,
      label: "if_then",
      content: project?.if_then ? project.if_then : "未設定",
    },
  ] satisfies CardItem[];

  return (
    <Box w={"auto"}>
      <Box h={{ base: 120, md: 156, lg: 192 }} bg={"gray.4"} />
      <Box px={{ base: 16, md: 32 }}>
        <Avatar mt={-36} size={72} radius={"sm"} bg={"white"}>
          <Clipboard size={48} />
        </Avatar>

        <Flex
          direction={"column"}
          mt={32}
          pb={32}
          gap={16}
          style={{ borderBottom: "1px solid #CDCDCD" }}
        >
          <Title order={2}>{project?.title}</Title>
          <Flex direction={"column"} gap={8}>
            {cardItems.map((item) => (
              <Flex key={item.label} gap={16}>
                <Group
                  gap={4}
                  w={100}
                  display={"inline-flex"}
                  style={{ alignItems: "center" }}
                  fz={14}
                >
                  {item.icon}
                  {item.label}
                </Group>

                <Text fz={14}>{item.content}</Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
