import { Suspense } from "react";

import { Button, Text } from "@mantine/core";

import c from "@/styles/page/settings.module.css";

import { UserDetailInfoSkeleton } from "../../../(home)/_components/skeletons";
import UserSettingInfo from "./user-setting-info";

export default async function Settings() {
  return (
    <div className={c.container}>
      <Suspense fallback={<UserDetailInfoSkeleton />}>
        <UserSettingInfo />
      </Suspense>

      <div className={c.main}>
        <div className={c.card}>
          <Text fw={"bold"}>アカウントの削除</Text>

          <Text pt={8} fz={{ base: 14, md: 16 }} c={"dimmed"}>
            Zen-Tonic のアカウントが削除されます。
            Notionのアカウントは削除されません。
          </Text>

          <div className={c.btn_wrapper}>
            <Button variant={"outline"} color={"#e06259"}>
              削除
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
