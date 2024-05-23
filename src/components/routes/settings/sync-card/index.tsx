"use client";

import { useState } from "react";
import Link from "next/link";

import { Button, Loader, Text } from "@mantine/core";

import { syncNotion } from "@/features/actions/post/sync-post";
import c from "@/styles/page/settings.module.css";

export default function SyncCard({
  userId,
  disabled,
  isProject,
}: {
  userId: string;
  disabled: boolean;
  isProject: boolean;
}) {
  const [pending, setPending] = useState(false);

  return (
    <div className={c.card}>
      <h3>Notionと同期する</h3>

      <p>
        1日に1回、Notion DB のデータと同期することができます
        <br />
        Notionで記録した際にご利用ください
      </p>

      {!isProject && (
        <Text c={"#e06259"} fz={14} fw={"bold"}>
          ※ プロジェクトがまだ作成されていません
        </Text>
      )}

      <div className={c.btn_wrapper}>
        {!isProject ? (
          <Button
            variant={"outline"}
            color={"#2483e2"}
            component={Link}
            href={"/d/project/setup"}
          >
            プロジェクトを作成する
          </Button>
        ) : (
          <Button
            variant={"outline"}
            color={"#2483e2"}
            disabled={disabled || pending}
            onClick={async () => {
              setPending(true);
              await syncNotion(userId);
              setPending(false);
            }}
          >
            {pending ? <Loader size={"sm"} color={"#2483e2"} /> : "同期する"}
          </Button>
        )}
      </div>
    </div>
  );
}
