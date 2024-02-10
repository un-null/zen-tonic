"use client";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Group,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";

import { createInitialProject } from "@/lib/action/setup-action";

type Props = {
  data: {
    id: string;
    properties: DatabaseObjectResponse["properties"];
    // properties: any;
  }[];
};

export default function SetupForm({ data }: Props) {
  console.log(data);

  return (
    <form action={createInitialProject}>
      <Flex gap={16} direction={"column"} w={"fit"} mt={40}>
        <Title order={3}>ページ URL を取得</Title>
        <TextInput
          type={"url"}
          label="ページURL"
          name="pageUrl"
          withAsterisk
          w={300}
          size={"xs"}
        />
      </Flex>

      <Flex direction={"column"} gap={32} mt={40}>
        <Box w={"fit"}>
          <Title order={3}>プロジェクトを作成</Title>
          <Text size={"sm"} mt={16}>
            習慣にしたいことを決めてみましょう！
          </Text>
        </Box>

        <Box>
          <TextInput
            label="タイトル"
            name="title"
            withAsterisk
            w={300}
            size={"xs"}
          />
          <Flex gap={16} my={16}>
            <Select
              label="期間"
              name="numberOfWeek"
              data={[
                { value: "4", label: "4 週間" },
                { value: "8", label: "8 週間" },
              ]}
              defaultValue={"4"}
              withAsterisk
              size={"xs"}
            />
            <Checkbox.Group label="曜日" withAsterisk size={"xs"}>
              <Group mt="xs">
                <Checkbox name="daysOfWeek[]" value="Mon" label="月" />
                <Checkbox name="daysOfWeek[]" value="Tue" label="火" />
                <Checkbox name="daysOfWeek[]" value="Wed" label="水" />
                <Checkbox name="daysOfWeek[]" value="Thu" label="木" />
                <Checkbox name="daysOfWeek[]" value="Fri" label="金" />
                <Checkbox name="daysOfWeek[]" value="Sat" label="土" />
                <Checkbox name="daysOfWeek[]" value="Sun" label="日" />
              </Group>
            </Checkbox.Group>
          </Flex>

          <Flex gap={16} my={16}>
            <TextInput label="if" name="_if" withAsterisk w={300} size={"xs"} />
            <TextInput
              label="then"
              name="then"
              withAsterisk
              w={300}
              size={"xs"}
            />
          </Flex>
        </Box>

        <Box w={"fit"}>
          <Button type={"submit"}>作成</Button>
        </Box>
      </Flex>
    </form>
  );
}
