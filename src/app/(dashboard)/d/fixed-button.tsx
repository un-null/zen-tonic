"use client";

import { Box, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import LinkButton from "../../(home)/_components/link-button";

// Fix Position
export default function FixedButton() {
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  return (
    <>
      {!isMobile ? null : (
        <Box pos={"absolute"} bottom={32} right={32}>
          <LinkButton />
        </Box>
      )}
    </>
  );
}
