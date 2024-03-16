import { ReactNode } from "react";
import Image from "next/image";

import { Box, Card, SimpleGrid } from "@mantine/core";

export default function NoPostCard({ children }: { children: ReactNode }) {
  return (
    <Card shadow="xs" padding="lg" radius="sm" withBorder>
      <SimpleGrid cols={2}>
        <Box
          mx={"auto"}
          w={{ base: 150, xs: 200 }}
          h={{ base: 150, xs: 200 }}
          pos={"relative"}
        >
          <Image src="/hero-image.svg" alt="Norway" fill />
        </Box>

        <Box px={8} m={"auto"}>
          {children}
        </Box>
      </SimpleGrid>
    </Card>
  );
}
