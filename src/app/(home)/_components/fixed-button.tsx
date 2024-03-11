"use client";

import { ReactNode } from "react";

import { Box, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import LinkButton from "./link-button";

// Fix Position
export default function FixedButton({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  return (
    <>
      {!isMobile ? (
        <Box pos={"absolute"} bottom={32} left={32}>
          <LinkButton />
        </Box>
      ) : (
        <Box pos={"absolute"} bottom={48} right={48}>
          {children}
        </Box>
      )}
    </>
  );
}
