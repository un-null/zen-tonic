"use client";

import { ReactNode } from "react";

import { Avatar, Box, em, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import LinkButton from "./link-button";
import Tab from "./tab";

export default function Header({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  return (
    <Box component={"header"} h={{ base: "auto", md: 60 }}>
      {!isMobile ? (
        <Flex gap={32} h={"100%"} align={"center"}>
          <Box>
            <Avatar size={"lg"} radius={"sm"} />
          </Box>

          <Tab type="home" />
          <Box>{children}</Box>
        </Flex>
      ) : (
        <Box>
          <Flex justify={"space-between"} align={"center"} p={16}>
            <Box>
              <Avatar size={"lg"} radius={"sm"} />
            </Box>
            <Box>
              <LinkButton />
            </Box>
          </Flex>

          <Box>
            <Tab type="home" />
          </Box>
        </Box>
      )}
    </Box>
  );
}
