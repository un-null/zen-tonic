"use client";

import { Avatar, Box, em, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import CraeteButton from "./create-button";
import LinkButton from "./link-button";
import Tab from "./tab";

export default function Header() {
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  return (
    <Box component={"header"} h={{ base: "auto", md: 60 }}>
      {!isMobile ? (
        <Flex gap={32} h={"100%"} align={"center"}>
          <Box>
            <Avatar size={"lg"} radius={"sm"} />
          </Box>

          <Tab type="home" />
          <Box>
            <CraeteButton
              //   projects={projectTitleArr}
              //   username={user.firstName}
              //   avatar={user.imageUrl}
              type={"button"}
            />
          </Box>
        </Flex>
      ) : (
        <Box>
          <Flex justify={"space-between"} align={"center"} px={16}>
            <Box>
              <Avatar size={"lg"} radius={"sm"} />
            </Box>
            <Box>
              <Avatar size={"lg"} radius={"sm"} />
            </Box>
            <Box>
              <LinkButton />
            </Box>
          </Flex>

          <Box mt={16}>
            <Tab type="home" />
          </Box>
        </Box>
      )}
    </Box>
  );
}
