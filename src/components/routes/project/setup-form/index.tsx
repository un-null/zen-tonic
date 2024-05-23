"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useClerk } from "@clerk/nextjs";
import { ComboboxItem, Select, TextInput } from "@mantine/core";
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { useFormState } from "react-dom";

import { createProject } from "@/features/actions/project/create-project";

import SubmitButton from "../submit-button";
import c from "./index.module.css";

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
  const [weekdayOption, setWeekdayOption] = useState<ComboboxItem | null>({
    value: "毎日",
    label: "毎日",
  });

  const [state, dispatch] = useFormState(createProject, initialState);

  const { pageOption } = retrieveOptions(data);

  const { signOut } = useClerk();
  const router = useRouter();

  return (
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

          <div className={c.dbOption_wrapper}>
            <Select
              label="ページ"
              name="id"
              data={pageOption}
              disabled={pageOption.length === 0}
              placeholder="データベースが作成されるNotionページ"
              withAsterisk
              w={{ base: "auto", sm: 300 }}
              size={"xs"}
            />

            {pageOption.length === 0 && (
              <p className={c.no_allow}>
                ページへのアクセスを許可してください。{" "}
                <span onClick={() => signOut(() => router.push("/"))}>
                  アクセスを許可する
                </span>
              </p>
            )}
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
