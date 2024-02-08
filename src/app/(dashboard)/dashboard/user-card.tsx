import { ReactNode } from "react";
import Link from "next/link";

import { Avatar, Button, Card, Flex, Text } from "@mantine/core";
import { Calendar, Clipboard } from "lucide-react";

type CardItem = {
  icon: ReactNode;
  label: string;
  content: string;
  href?: string;
};

const cardItems = [
  {
    icon: <Calendar size="1rem" style={{ marginRight: 8 }} />,
    label: "利用開始",
    content: "yyyy/mm/dd",
  },
  {
    icon: <Clipboard size="1rem" style={{ marginRight: 8 }} />,
    label: "進行中のプロジェクト",
    content: "プロジェクトタイトル",
    href: "/dashboard/project",
  },
] satisfies CardItem[];

export default function UserCard() {
  return (
    <Card shadow="xs" padding="lg" radius="sm" withBorder>
      <Flex align={"center"} gap={32} pb={32}>
        <Avatar size={"lg"} radius={"sm"} />
        <Flex flex={1} direction={"column"}>
          <Text>username</Text>
          <Text size={"xs"}>Notion Database Link</Text>
        </Flex>
        <Button
          href={"/dashboard/setting"}
          component={Link}
          variant={"outline"}
          c={"dark.8"}
          style={{ borderColor: "#C9C9C9" }}
        >
          設定
        </Button>
      </Flex>
      {cardItems.map((item) => (
        <Flex
          key={item.label}
          align={"center"}
          gap={32}
          py={16}
          style={{ borderTop: "1px solid #C9C9C9" }}
        >
          <Flex key={item.label} align={"center"}>
            <Text
              size={"sm"}
              px={16}
              display={"inline-flex"}
              style={{ alignItems: "center" }}
              w={200}
            >
              {item.icon}
              {item.label}
            </Text>
            <Text size={"sm"}>{item.content}</Text>
          </Flex>
        </Flex>
      ))}
    </Card>
  );
}
