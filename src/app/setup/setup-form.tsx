"use client";

import { useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  ComboboxItem,
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
    object: "database" | "page";
    title: string;
    properties: DatabaseObjectResponse["properties"];
  }[];
};

export default function SetupForm({ data }: Props) {
  const [value, setValue] = useState<ComboboxItem | null>({
    value: "database",
    label: "データベースを登録する",
  });

  // Fix
  const pageOption = data
    .filter((d) => d.object === "page")
    .map((value) => {
      return {
        value: value.id,
        label: value.title,
      };
    });

  // Fix
  const dbOption = data
    .filter((d) => d.object === "database")
    .map((value) => {
      return {
        value: value.id,
        label: value.title,
      };
    });

  return (
    // + database or page ID を action に渡す！
    <form action={createInitialProject}>
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

          <Select
            label="アクション"
            name="object"
            w={300}
            my={16}
            data={[
              { value: "database", label: "データベースを登録する" },
              { value: "page", label: "ページにデータベースを作成する" },
            ]}
            value={value ? value.value : "database"}
            onChange={(_value, option) => setValue(option)}
            withAsterisk
            size={"xs"}
          />

          {/* Fix validation */}
          <Select
            label={value?.value === "database" ? "データベース" : "ページ"}
            name="id"
            w={300}
            my={16}
            data={value?.value === "database" ? dbOption : pageOption}
            withAsterisk
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
                <Checkbox name="weekDays[]" value="Mon" label="月" />
                <Checkbox name="weekDays[]" value="Tue" label="火" />
                <Checkbox name="weekDays[]" value="Wed" label="水" />
                <Checkbox name="weekDays[]" value="Thu" label="木" />
                <Checkbox name="weekDays[]" value="Fri" label="金" />
                <Checkbox name="weekDays[]" value="Sat" label="土" />
                <Checkbox name="weekDays[]" value="Sun" label="日" />
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
