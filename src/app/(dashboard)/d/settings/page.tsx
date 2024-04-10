import { Suspense } from "react";

import { Box, Button, Card, Text } from "@mantine/core";

import { UserDetailInfoSkeleton } from "../../../(home)/_components/skeletons";
import UserSettingInfo from "./user-setting-info";

export default async function Settings() {
  return (
    <Box mt={32}>
      <Suspense fallback={<UserDetailInfoSkeleton />}>
        <UserSettingInfo />
      </Suspense>

      <Box mt={16} px={{ base: 16, md: 32 }}>
        <Card withBorder radius="xs" padding="md">
          <Text fw={"bold"}>アカウントの削除</Text>

          <Text pt={8} fz={{ base: 14, md: 16 }} c={"dimmed"}>
            Zen-Tonic のアカウントが削除されます。
            <br />
            Notionのアカウントは削除されません。
          </Text>

          <Box mt={16}>
            <Button variant={"outline"} color={"#e06259"}>
              削除
            </Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
