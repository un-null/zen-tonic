"use client";

import { useRouter } from "next/navigation";

import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Flex,
  Modal as MantineModal,
  Select,
  Text,
  Textarea,
} from "@mantine/core";
import { useFormState } from "react-dom";

import { createPost, State } from "@/lib/action/post/create-post";

const initialState: State = { message: null, errors: {} };

export default function Modal({
  projects,
  isDone,
  username,
  avatar,
}: {
  projects?: string[];
  isDone: boolean;
  username?: string | null;
  avatar?: string | null;
}) {
  const router = useRouter();
  const close = () => router.push("/");
  const [state, dispatch] = useFormState(createPost, initialState);

  const isProjects = !projects || projects.length !== 0;

  return (
    <>
      <MantineModal
        opened={true}
        onClose={close}
        size={"lg"}
        withCloseButton={false}
      >
        <Text ta={"center"} size="sm" mb={8}>
          今日の記録
        </Text>
        {isProjects ? (
          !isDone ? (
            <Flex
              gap={16}
              p={16}
              style={{ border: "1px solid #C9C9C9", borderRadius: 4 }}
            >
              <Avatar size={"md"} radius={"sm"} src={avatar} />
              <Flex direction={"column"} gap={16} flex={1}>
                <Text size="sm" c={"dimmed"}>
                  {`@${username ? username : "username"}`}
                </Text>
                <form action={dispatch}>
                  <Select
                    label="プロジェクト名"
                    size={"xs"}
                    withAsterisk
                    maw={200}
                    data={projects}
                    name="project"
                  />
                  {state.errors?.project &&
                    state.errors.project.map((error: string) => (
                      <Text key={error} size="xs" c={"#e06259"} pt={4}>
                        {error}
                      </Text>
                    ))}
                  <Checkbox
                    mt={"md"}
                    size={"xs"}
                    label="本日の目標は達成できましたか？"
                    name="done"
                  />

                  <Divider my={"md"} />

                  <Textarea
                    placeholder="コメントを残す..."
                    style={{
                      borderStyle: "none",
                      borderColor: "transparent",
                    }}
                    autosize
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
          ) : (
            <Flex
              gap={32}
              py={16}
              justify={"center"}
              align={"center"}
              direction={"column"}
            >
              <Text>本日は記録済みです</Text>

              <Button onClick={close}>モーダルを閉じる</Button>
            </Flex>
          )
        ) : (
          <Flex
            gap={32}
            py={16}
            justify={"center"}
            align={"center"}
            direction={"column"}
          >
            <Text>プロジェクトが存在しません</Text>

            <Button onClick={close}>モーダルを閉じる</Button>
          </Flex>
        )}
      </MantineModal>
    </>
  );
}
