"use client";

import { useRouter } from "next/navigation";

import { useClerk } from "@clerk/nextjs";
import { Button } from "@mantine/core";

import { deleteUser } from "@/features/actions/user/delete-user";
import c from "@/styles/page/settings.module.css";

export default function DeleteAccountCard({ userId }: { userId: string }) {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
    <div className={c.card}>
      <h3>アカウントの削除</h3>

      <p>
        Zen-Tonic のアカウントが削除されます Notionのアカウントは削除されません
      </p>

      <div className={c.btn_wrapper}>
        <Button
          variant={"outline"}
          color={"#e06259"}
          onClick={async () => {
            await deleteUser(userId);
            signOut(() => router.push("/"));
          }}
        >
          削除
        </Button>
      </div>
    </div>
  );
}
