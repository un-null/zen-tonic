import { Suspense } from "react";

import { Box, Flex, Skeleton } from "@mantine/core";

import { UserInfoSkeleton } from "../../../(home)/_components/skeletons";
import HeatMapWrapper from "./heatmap-wrapper";
import UserInfo from "./user-info";

export default async function Dashboard() {
  return (
    <Flex gap={32} direction={"column"}>
      <Suspense fallback={<UserInfoSkeleton />}>
        <UserInfo />
      </Suspense>

      <Suspense
        fallback={
          <Box miw={"md"}>
            <Skeleton h={240} />
          </Box>
        }
      >
        <Box px={{ base: 16, md: 32 }}>
          <HeatMapWrapper />
        </Box>
      </Suspense>
    </Flex>
  );
}
