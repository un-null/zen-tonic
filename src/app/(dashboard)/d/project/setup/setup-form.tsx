"use client";

import { useState } from "react";

import { ComboboxItem, Select, TextInput } from "@mantine/core";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { useFormState } from "react-dom";

import { createProject } from "@/lib/action/project/create-project";
import c from "@/styles/components/dashboard/setup-form.module.css";

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

const weekDays = ["月", "火", "水", "木", "金", "土", "日"];

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
      <div className={c.container}>
        <div>
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
            data={[
              { value: "database", label: "データベースを登録する" },
              { value: "page", label: "ページにデータベースを作成する" },
            ]}
            onChange={(_, option) => setValue(option)}
            withAsterisk
            w={{ base: "auto", sm: 300 }}
            my={16}
            size={"xs"}
          />

          <div className={c.dbOption_wrapper}>
            <Select
              key={value?.value}
              label={value?.value === "database" ? "データベース" : "ページ"}
              name="id"
              data={value?.value === "database" ? dbOption : pageOption}
              withAsterisk
              w={{ base: "auto", sm: 300 }}
              size={"xs"}
            />

            {state.error?.id &&
              state.error.id.map((error, index) => <p key={index}>{error}</p>)}
          </div>

          <div className={c.dayOption_wrapper}>
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

            {/* Todo：FormData での受け渡し方法を考える ??? */}
            <div className={c.weekDaysOption_wrapper}>
              <Select
                label="繰り返し"
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
                <div className={c.weekDaysOption}>
                  {weekDays.map((day) => (
                    <label key={day}>
                      <input type={"checkbox"} name="weekDays[]" value={day} />
                      <span>{day}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={c.rule}>
            <TextInput
              label="どんなとき"
              placeholder="寝る前に"
              name="_if"
              w={{ base: "auto", sm: 300 }}
              size={"xs"}
            />
            <TextInput
              label="なにをする"
              placeholder="30分読書する"
              name="then"
              w={{ base: "auto", sm: 300 }}
              size={"xs"}
            />
          </div>
        </div>

        <div className={c.button_wrapper}>
          <SubmitButton />
        </div>
      </div>
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
