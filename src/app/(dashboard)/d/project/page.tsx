import { Suspense } from "react";

import { Box, Title } from "@mantine/core";

import { ProjectHomekeleton } from "../../../(home)/_components/skeletons";
import ProjectList from "./project-list";

export default async function Project() {
  return (
    <Box>
      <Title order={2}>プロジェクト</Title>
      <Suspense fallback={<ProjectHomekeleton />}>
        <Box mt={32}>
          <ProjectList />
        </Box>
      </Suspense>
    </Box>
  );
}
