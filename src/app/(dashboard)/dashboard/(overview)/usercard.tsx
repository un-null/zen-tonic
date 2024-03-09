import { ReactNode } from "react";
import Link from "next/link";

import { currentUser } from "@clerk/nextjs";
import { Anchor, Avatar, Button, Card, Flex, Text } from "@mantine/core";
import dayjs from "dayjs";
import { Calendar, Clipboard } from "lucide-react";

type CardItem = {
  icon: ReactNode;
  label: string;
  content?: string;
  href?: string;
};

type Props = {
  id?: string;
  title?: string;
  startDate?: string;
};

// Fix
export default async function UserCard({ id = "", title, startDate }: Props) {
  const user = await currentUser();

  const cardItems = [
    {
      icon: <Calendar size="1rem" style={{ marginRight: 8 }} />,
      content: startDate ? dayjs(startDate).format("YYYY.MM.DD") : "未設定",
      label: "利用開始",
    },
    {
      icon: <Clipboard size="1rem" style={{ marginRight: 8 }} />,
      label: "進行中のプロジェクト",
      content: title ? title : "未設定",
      href: "/dashboard/project",
    },
  ] satisfies CardItem[];

  return (
    <Card shadow="xs" padding="lg" radius="sm" withBorder>
      <Flex align={"center"} gap={32} pb={32}>
        <Avatar size={"lg"} radius={"sm"} src={user?.imageUrl} />
        <Flex flex={1} gap={4} direction={"column"}>
          <Text fw={600}>{user?.firstName}</Text>
          <Anchor
            size={"xs"}
            href={"https://www.notion.so/"}
            underline={"always"}
            target={"_blank"}
            c={"#2483e2"}
          >
            Go to your Notion
          </Anchor>
        </Flex>
        <Button
          href={"/dashboard/settings"}
          component={Link}
          variant={"outline"}
          c={"dark.8"}
          style={{ borderColor: "#C9C9C9" }}
        >
          設定
        </Button>
      </Flex>
      {cardItems.map((item, index) => (
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
            {index === 1 ? (
              <Anchor
                component={Link}
                href={`dashboard/project/${id}`}
                size={"sm"}
                underline={"always"}
                c={"#2483e2"}
              >
                {item.content}
              </Anchor>
            ) : (
              <Text size={"sm"}>{item.content}</Text>
            )}
          </Flex>
        </Flex>
      ))}
    </Card>
  );
}
