"use client";

import { ReactNode } from "react";

import {
  Flex,
  Group,
  Avatar as MantineAvatar,
  Modal,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import dayjs from "dayjs";
import { Calendar, Clipboard } from "lucide-react";

type Props = {
  image: string | null;
  title: string | null;
  start: Date;
  children: ReactNode;
};

export default function Avatar({
  children,
  image = "",
  title = "",
  start,
}: Props) {
  const [opened, { open, close }] = useDisclosure(false);

  const items = [
    {
      icon: <Calendar size={16} />,
      name: "開始日",
      data: dayjs(start).format("YYYY.MM.DD"),
    },
    {
      icon: <Clipboard size={16} />,
      name: "進行中",
      data: title,
    },
  ];

  return (
    <>
      <MantineAvatar
        size={"md"}
        radius={"sm"}
        src={image}
        onClick={open}
        style={{ cursor: "pointer" }}
      />

      <Modal opened={opened} onClose={close} withCloseButton={false}>
        <Flex direction={"column"} pb={32} gap={32}>
          {children}
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
      </Modal>
    </>
  );
}
