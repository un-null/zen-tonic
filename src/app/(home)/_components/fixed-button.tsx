"use client";

import { Box, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import CraeteButton from "./create-button";
import LinkButton from "./link-button";

export default function FixedButton() {
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  return (
    <>
      {!isMobile ? (
        <Box pos={"sticky"} bottom={32} left={32}>
          <LinkButton />
        </Box>
      ) : (
        <Box pos={"absolute"} bottom={48} right={48}>
          <CraeteButton type={"button"} />
        </Box>
      )}
    </>
  );
}
