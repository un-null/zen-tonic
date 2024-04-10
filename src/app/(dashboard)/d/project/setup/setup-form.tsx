"use client";

import { useState } from "react";

import {
  Box,
  Checkbox,
  ComboboxItem,
  Flex,
  Group,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { useFormState } from "react-dom";

import { createProject } from "@/lib/action/project/create-project";

import SubmitButton from "./submit-button";

type Props = {
  data: {
    id: string;
    object: "database" | "page";
    title: string;
    properties?: DatabaseObjectResponse["properties"];
  }[];
};

const initialState = { message: "", errors: {} };

export default function SetupForm({ data }: Props) {
  const [value, setValue] = useState<ComboboxItem | null>({
    value: "database",
    label: "データベースを登録する",
  });

  const [weekdayOption, setWeekdayOption] = useState<ComboboxItem | null>({
    value: "毎日",
    label: "毎日",
  });

  const [state, dispatch] = useFormState(createProject, initialState);

  const { pageOption, dbOption } = retrieveOptions(data);

  return (
    // + database or page ID を action に渡す！
    <form action={dispatch}>
      <Flex direction={"column"} gap={32} w={"auto"}>
        <Box>
          <TextInput
            label="タイトル"
            name="title"
            withAsterisk
            w={{ base: "auto", sm: 300 }}
            size={"xs"}
          />

          <Select
            label="アクション"
            name="object"
            w={{ base: "auto", sm: 300 }}
            my={16}
            data={[
              { value: "database", label: "データベースを登録する" },
              { value: "page", label: "ページにデータベースを作成する" },
            ]}
            onChange={(_, option) => setValue(option)}
            withAsterisk
            size={"xs"}
          />

          <Box my={16}>
            <Select
              key={value?.value}
              label={value?.value === "database" ? "データベース" : "ページ"}
              name="id"
              w={{ base: "auto", sm: 300 }}
              data={value?.value === "database" ? dbOption : pageOption}
              withAsterisk
              size={"xs"}
            />

            {state.error?.id &&
              state.error.id.map((error, index) => (
                <Text key={index} mt={8} size={"xs"} fw={"bold"} c={"#e06259"}>
                  {error}
                </Text>
              ))}
          </Box>

          <Flex gap={16} my={16} direction={{ base: "column", md: "row" }}>
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
              w={{ base: "auto", sm: 300 }}
            />

            {/* Todo：FormData での受け渡し方法を考える */}
            <Select
              label="曜日"
              data={[
                { value: "毎日", label: "毎日" },
                { value: "カスタム", label: "カスタム" },
              ]}
              defaultValue={"毎日"}
              onChange={(_, option) => setWeekdayOption(option)}
              withAsterisk
              name="weekDayOption"
              size={"xs"}
              w={{ base: "auto", sm: 300 }}
            />
            {weekdayOption?.value === "カスタム" && (
              <Checkbox.Group withAsterisk size={"xs"}>
                <Group mt="xs">
                  <Checkbox name="weekDays[]" value="月" label="月" />
                  <Checkbox name="weekDays[]" value="火" label="火" />
                  <Checkbox name="weekDays[]" value="水" label="水" />
                  <Checkbox name="weekDays[]" value="木" label="木" />
                  <Checkbox name="weekDays[]" value="金" label="金" />
                  <Checkbox name="weekDays[]" value="土" label="土" />
                  <Checkbox name="weekDays[]" value="日" label="日" />
                </Group>
              </Checkbox.Group>
            )}
          </Flex>

          <Flex gap={16} my={16} direction={{ base: "column", md: "row" }}>
            <TextInput
              label="if"
              name="_if"
              w={{ base: "auto", sm: 300 }}
              size={"xs"}
            />
            <TextInput
              label="then"
              name="then"
              w={{ base: "auto", sm: 300 }}
              size={"xs"}
            />
          </Flex>
        </Box>

        <Box w={"fit"}>
          <SubmitButton />
        </Box>
      </Flex>
    </form>
  );
}

const retrieveOptions = (data: Props["data"]) => {
  const pageOption = data
    .filter((d) => d.object === "page")
    .map((value) => {
      return {
        value: value.id,
        label: value.title,
      };
    });

  const dbOption = data
    .filter((d) => d.object === "database")
    .map((value) => {
      return {
        value: value.id,
        label: value.title,
      };
    });

  return { pageOption, dbOption };
};
