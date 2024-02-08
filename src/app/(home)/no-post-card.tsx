import Image from "next/image";
import Link from "next/link";

import { Anchor, Box, Card, SimpleGrid } from "@mantine/core";
import { ArrowRight } from "lucide-react";

export default function NoPostCard() {
  return (
    <Card shadow="xs" padding="lg" radius="sm" withBorder>
      <SimpleGrid cols={2}>
        <Box mx={"auto"}>
          <Image src="/hero-image.svg" alt="Norway" width={200} height={200} />
        </Box>

        <Anchor
          component={Link}
          href={"/"}
          size={"lg"}
          px={8}
          mx={"auto"}
          display={"inline-flex"}
          style={{ alignItems: "center" }}
        >
          記録する
          <ArrowRight size={20} style={{ marginLeft: 2 }} />
        </Anchor>
      </SimpleGrid>
    </Card>
  );
}
