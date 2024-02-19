import { Suspense } from "react";

import { currentUser } from "@clerk/nextjs";
import { Box, Flex, Skeleton, Title } from "@mantine/core";

import { prisma } from "@/lib/prisma";

import HeatMap from "./heatmap";
import UserCard from "./usercard";

export default async function Dashboard() {
  const user = await currentUser();

  const latestProject = await prisma.project.findFirst({
    where: {
      user_id: user?.id,
    },
    orderBy: { start_date: "desc" },
  });

  const posts = await prisma.post.findMany({
    where: {
      project_id: latestProject?.id,
    },
    orderBy: { created_at: "desc" },
  });

  const dateArr = posts.map((post) => {
    return {
      date: post.created_at.toISOString().substring(0, 10),
    };
  });

  return (
    <Box>
      <Title order={2}>ダッシュボード</Title>
      <Flex direction={"column"} mt={32} gap={32}>
        {/* Fix composition and props */}
        <Suspense
          fallback={
            <Box miw={"md"}>
              <Skeleton h={240} />
            </Box>
          }
        >
          <UserCard
            databaseId={latestProject?.database_id!}
            startDate={
              latestProject?.start_date.toISOString().substring(0, 10)!
            }
          />
        </Suspense>

        <Suspense
          fallback={
            <Box miw={"md"}>
              <Skeleton h={240} />
            </Box>
          }
        >
          <HeatMap dateArr={dateArr} />
        </Suspense>
      </Flex>
    </Box>
  );
}
