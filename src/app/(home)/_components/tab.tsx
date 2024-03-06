"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Anchor, Box, Flex, Text } from "@mantine/core";

const HomeTabItem = [
  {
    href: "/",
    label: "みんな",
  },
  {
    href: "/friends",
    label: "ともだち",
  },
];

const NoticeTabItem = [
  {
    href: "/dashboard/notice",
    label: "AAA",
  },
  {
    href: "/dashboard/notice",
    label: "BBB",
  },
];

// Fix type.type
export default function Tab({ type }: { type: "home" | "notice" }) {
  const pathname = usePathname();

  return (
    <Flex flex={1} ta={"center"} w={"100%"} h={"100%"} align={"end"}>
      {type === "home" &&
        HomeTabItem.map((item) => (
          <Anchor
            key={item.href}
            component={Link}
            href={item.href}
            flex={1}
            td={"none"}
            p={8}
          >
            <Text
              pb={4}
              style={
                pathname === item.href
                  ? { borderBottom: "2px solid #242424" }
                  : undefined
              }
            >
              {item.label}
            </Text>
          </Anchor>
        ))}

      {type === "notice" &&
        NoticeTabItem.map((item) => (
          <Anchor
            key={item.href}
            component={Link}
            href={item.href}
            flex={1}
            td={"none"}
          >
            <Box>{item.label}</Box>
          </Anchor>
        ))}
    </Flex>
  );
}
