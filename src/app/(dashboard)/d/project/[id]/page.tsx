import { Suspense } from "react";

import { Box, Flex } from "@mantine/core";

import {
  ProjectDetailInfoSkeleton,
  ProjectProgressSkeleton,
} from "../../skeletons";
import Progress from "./progress";
import ProjectInfo from "./project-info";

export default async function PageDetail({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Flex gap={32} direction={"column"}>
      <Suspense fallback={<ProjectDetailInfoSkeleton />}>
        <ProjectInfo id={params.id} />
      </Suspense>

      <Suspense fallback={<ProjectProgressSkeleton />}>
        {/* Fix mobile width */}
        <Box px={32} w={{ base: 300, xs: "auto" }}>
          <Progress id={params.id} />
        </Box>
      </Suspense>
    </Flex>
  );
}
