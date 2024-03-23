import { currentUser } from "@clerk/nextjs";
import { Box } from "@mantine/core";

import { prisma } from "@/lib/prisma";

import HeatMap from "./heatmap";

export default async function HeatMapWrapper() {
  const user = await currentUser();

  const inProgressProject = await prisma.project.findFirst({
    where: {
      user_id: user?.id,
    },
    orderBy: { start_date: "desc" },
    select: {
      id: true,
      title: true,
      start_date: true,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      project_id: inProgressProject?.id,
    },
    orderBy: { created_at: "desc" },
  });

  const dateArr = posts.map((post) => {
    return {
      date: post.created_at.toISOString().substring(0, 10),
    };
  });

  return (
    <Box w={{ base: "auto", md: 708 }}>
      <HeatMap dateArr={dateArr} />
    </Box>
  );
}
