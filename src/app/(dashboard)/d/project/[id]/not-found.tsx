import Link from "next/link";

import { Button, Text, Title } from "@mantine/core";
import { Frown } from "lucide-react";

import c from "@/styles/layout/not-found.module.css";

export default function NotFound() {
  return (
    <main className={c.container}>
      <div className={c.main}>
        <Frown width={40} color="#e06259" />
        <Title order={3} c={"#e06259"}>
          404 Not Found
        </Title>
        <Text size={"sm"}>プロジェクトが見つかりませんでした</Text>
        <Button component={Link} href="/d/project" bg={"dark.5"} mt={16}>
          プロジェクト一覧に戻る
        </Button>
      </div>
    </main>
  );
}
