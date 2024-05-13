import { Suspense } from "react";

import { Box, Title } from "@mantine/core";

import { ProjectHomekeleton } from "@/components/layout/skeltons";
import ProjectList from "@/components/routes/project/project-list";

export default async function Project() {
  return (
    <div>
      <Title order={2}>プロジェクト</Title>
      <Suspense fallback={<ProjectHomekeleton />}>
        <Box mt={32}>
          <ProjectList />
        </Box>
      </Suspense>
    </div>
  );
}
