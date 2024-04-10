import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Avatar, Box, Flex, Group, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { Calendar, Mailbox } from "lucide-react";

import { getUserDetail } from "@/lib/db/user";

export default async function UserSettingInfo() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const dbUser = await getUserDetail(user.id);

  const items = [
    {
      icon: <Mailbox size="1rem" style={{ marginRight: 8 }} />,
      content: dbUser?.email,
      label: "アドレス",
    },
    {
      icon: <Calendar size="1rem" style={{ marginRight: 8 }} />,
      content: dayjs(dbUser?.created_at).format("YYYY.MM.DD"),
      label: "利用開始",
    },
  ];

  return (
    <>
      <Box h={120} bg={"gray.4"} />
      <Box px={{ base: 16, md: 32 }}>
        <Avatar mt={-36} src={dbUser?.image} w={72} h={72} radius={"xs"} />

        <Flex
          direction={"column"}
          mt={32}
          pb={32}
          gap={16}
          style={{ borderBottom: "1px solid #CDCDCD" }}
        >
          <Title order={2}>{user?.firstName}</Title>
          <Flex direction={"column"} gap={8}>
            {items.map((item) => (
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
    </>
  );
}
