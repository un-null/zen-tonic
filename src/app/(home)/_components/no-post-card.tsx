import Image from "next/image";

import { Box, Card, SimpleGrid } from "@mantine/core";

import CraeteButton from "./create-button";

// Fix props drilling
export default function NoPostCard({ projects }: { projects: string[] }) {
  return (
    <Card shadow="xs" padding="lg" radius="sm" withBorder>
      <SimpleGrid cols={2}>
        <Box mx={"auto"}>
          <Image src="/hero-image.svg" alt="Norway" width={200} height={200} />
        </Box>

        <Box px={8} m={"auto"}>
          <CraeteButton type={"text"} projects={projects} />
        </Box>
      </SimpleGrid>
    </Card>
  );
}
