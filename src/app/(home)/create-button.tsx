"use client";

import {
  ActionIcon,
  Avatar,
  Button,
  Checkbox,
  Divider,
  Flex,
  Modal,
  Select,
  Text,
  Textarea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Plus } from "lucide-react";

import { createPost } from "@/lib/action/post-action";

export default function CraeteButton({ projects }: { projects: string[] }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size={"lg"}
        withCloseButton={false}
      >
        <Text ta={"center"} size="sm" mb={8}>
          今日の記録
        </Text>
        <Flex
          gap={16}
          p={16}
          style={{ border: "1px solid #C9C9C9", borderRadius: 4 }}
        >
          <Avatar size={"md"} radius={"sm"} />
          <Flex direction={"column"} gap={16} flex={1}>
            <Text size="sm" c={"dimmed"}>
              @username
            </Text>
            <form action={createPost}>
              <Select
                label="プロジェクト名"
                size={"xs"}
                withAsterisk
                maw={200}
                data={projects}
                name="project"
              />
              <Checkbox
                mt={"md"}
                size={"xs"}
                label="本日の目標は達成できましたか？"
                name="done"
              />

              <Divider my={"md"} />

              <Textarea
                placeholder="コメントを残す..."
                style={{ borderStyle: "none", borderColor: "transparent" }}
                name="comment"
              />

              <Flex gap={8} mt={16}>
                <Button size="sm" type="submit">
                  投稿
                </Button>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Modal>

      <ActionIcon
        radius={"xl"}
        variant={"outline"}
        size={"xl"}
        c={"dark.1"}
        onClick={open}
        style={{ border: "1px solid #C9C9C9" }}
      >
        <Plus />
      </ActionIcon>
    </>
  );
}
