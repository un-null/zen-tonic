import { ReactNode } from "react";
import Link from "next/link";

import { currentUser } from "@clerk/nextjs";
import { Anchor, Avatar, Box, Flex, Group, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { Calendar, Clipboard } from "lucide-react";

import { prisma } from "@/lib/prisma";

type CardItem = {
  icon: ReactNode;
  label: string;
  content?: string;
  href?: string;
};

export default async function UserInfo() {
  const user = await currentUser();

  const inProgressProject = await prisma.project.findFirst({
    where: {
      user_id: user?.id,
    },
    orderBy: { start_date: "desc" },
    select: {
      id: true,
      title: true,
      start_date: true,
    },
  });

  const startDate = inProgressProject?.start_date
    .toISOString()
    .substring(0, 10);

  const cardItems = [
    {
      icon: <Calendar size="1rem" style={{ marginRight: 8 }} />,
      content: startDate ? dayjs(startDate).format("YYYY.MM.DD") : "未設定",
      label: "利用開始",
    },
    {
      icon: <Clipboard size="1rem" style={{ marginRight: 8 }} />,
      label: "取り組み中",
      content: inProgressProject?.title ? inProgressProject?.title : "未設定",
      href: "/d/project",
    },
  ] satisfies CardItem[];

  return (
    <Box w={"auto"}>
      <Box h={{ base: 120, md: 156, lg: 192 }} bg={"gray.4"} />
      <Box px={{ base: 16, md: 32 }}>
        <Avatar mt={-36} size={72} radius={"sm"} src={user?.imageUrl} />

        <Flex
          direction={"column"}
          mt={32}
          pb={32}
          gap={16}
          style={{ borderBottom: "1px solid #CDCDCD" }}
        >
          <Anchor component={Link} href={`/d/user/${user?.id}`}>
            <Title order={2}>{user?.firstName}</Title>
          </Anchor>
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
