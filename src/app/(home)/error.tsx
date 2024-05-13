"use client";

import { Button, Title } from "@mantine/core";

import c from "@/styles/layout/error.module.css";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className={c.container}>
      <div className={c.main}>
        <Title order={3} c={"#e06259"}>
          エラーが発生しました
        </Title>
        <Button onClick={() => reset()}>戻る</Button>
      </div>
    </main>
  );
}
