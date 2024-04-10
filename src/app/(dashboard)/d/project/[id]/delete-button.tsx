"use client";

import { Button, Flex, Modal, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Trash2 } from "lucide-react";

import { deleteProject } from "@/lib/action/project/delete-project";

export default function DeleteButton({ projectId }: { projectId: string }) {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Button
        variant={"outline"}
        c={"dark.8"}
        p={4}
        style={{ borderColor: "#C9C9C9", aspectRatio: 1 }}
        onClick={toggle}
      >
        <Trash2 size={20} />
      </Button>

      <Modal
        opened={opened}
        onClose={close}
        withCloseButton={false}
        radius="sm"
        centered
        w={300}
        h={300}
      >
        <Flex direction={"column"} gap={32}>
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            gap={16}
            mt={32}
            mb={16}
          >
            {/* Fix description */}
            <Title order={4}>プロジェクトを削除しますか？</Title>
            <Text>Notion のデータベースは削除されません</Text>
          </Flex>
          <Flex justify={"center"} align={"center"} gap={32}>
            <Button
              onClick={close}
              variant={"outline"}
              c={"dark.8"}
              style={{ borderColor: "#C9C9C9" }}
            >
              キャンセル
            </Button>
            {/* pick up function  */}
            <Button
              variant={"outline"}
              style={{ borderColor: "#e06259", color: "#e06259" }}
              onClick={async () => {
                await deleteProject(projectId);
              }}
            >
              削除する
            </Button>
          </Flex>
        </Flex>
      </Modal>
    </>
  );
}
