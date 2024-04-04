"use client";

import { Card, em, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import LinkButton from "../../(home)/_components/link-button";

// Fix Position
export default function FixedButton() {
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  return (
    <>
      {!isMobile ? null : (
        <Card
          pos={"absolute"}
          bottom={32}
          right={32}
          withBorder
          p={8}
          radius={"lg"}
        >
          <Flex gap={4}>
            <LinkButton type={"home"} />
            <LinkButton type={"dashboard"} />
          </Flex>
        </Card>
      )}
    </>
  );
}
