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

  const [state, dispatch] = useFormState(createProject, initialState);

  const { pageOption, dbOption } = retrieveOptions(data);

  return (
    // + database or page ID を action に渡す！
    <form action={dispatch}>
      <Flex direction={"column"} gap={32}>
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

          <Box my={16}>
            <Select
              key={value?.value}
              label={value?.value === "database" ? "データベース" : "ページ"}
              name="id"
              w={300}
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
            <TextInput label="if" name="_if" w={300} size={"xs"} />
            <TextInput label="then" name="then" w={300} size={"xs"} />
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
