"use client";

import Link from "next/link";

import { Anchor, Avatar, Box, em, Flex, SimpleGrid, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export default function Footer() {
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  return (
    <>
      {!isMobile ? (
        <Box
          component="footer"
          p={40}
          style={{ borderTop: "1px solid #cecece" }}
        >
          <Flex
            w={"36em"}
            mx={"auto"}
            justify={"space-between"}
            align={"center"}
          >
            <Flex justify={"space-between"} align={"center"} gap={8}>
              <Avatar size={"sm"} radius={"sm"} />
              <Text size={"xs"}>zen-tonic</Text>
              <Anchor
                href="https://twitter.com/nu_____ll"
                target="_blank"
                size={"xs"}
              >
                {`(@nu_____ll)`}
              </Anchor>
            </Flex>
            <SimpleGrid cols={2}>
              <Anchor component={Link} href={"/"} size={"sm"}>
                ホーム
              </Anchor>
              <Anchor href="/d" size={"sm"}>
                規約とポリシー
              </Anchor>
              <Anchor href="/d" size={"sm"}>
                使い方
              </Anchor>
            </SimpleGrid>
          </Flex>
        </Box>
      ) : null}
    </>
  );
}
