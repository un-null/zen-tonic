"use client";

import { Button } from "@mantine/core";

import { syncNotion } from "@/features/actions/post/sync-post";
import c from "@/styles/page/settings.module.css";

export default function SyncCard({
  userId,
  disabled,
}: {
  userId: string;
  disabled: boolean;
}) {
  return (
    <div className={c.card}>
      <h3>Notionと同期する</h3>

      <p>
        1日に1回、Notion DB のデータと同期することができます
        <br />
        Notionで記録した際にご利用ください
      </p>

      <div className={c.btn_wrapper}>
        <Button
          variant={"outline"}
          color={"#2483e2"}
          disabled={disabled}
          onClick={async () => {
            await syncNotion(userId);
          }}
        >
          同期する
        </Button>
      </div>
    </div>
  );
}
