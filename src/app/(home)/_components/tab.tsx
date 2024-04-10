"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Anchor, Box, Flex, Text } from "@mantine/core";
import { Heart, UserRoundPlus } from "lucide-react";

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
    leftSection: <Heart size={16} />,
    href: "/d/notice",
    label: "いいね",
  },
  {
    leftSection: <UserRoundPlus size={16} />,
    href: "/d/notice/request",
    label: "リクエスト",
  },
];

const usreTabItem = [
  {
    href: "/d/user/followee",
    label: "フォロー",
  },
  {
    href: "/d/user/follower",
    label: "フォロワー",
  },
];

// Fix type.type
export default function Tab({ type }: { type: "home" | "notice" | "user" }) {
  const pathname = usePathname();

  return (
    <Flex
      flex={1}
      ta={"center"}
      w={"100%"}
      h={"100%"}
      align={"end"}
      style={{ borderBottom: "1px solid #C9C9C9" }}
      gap={type !== "home" ? 16 : undefined}
      pl={type !== "home" ? 16 : undefined}
    >
      {type === "home" &&
        HomeTabItem.map((item) => (
          <Anchor
            key={item.href}
            component={Link}
            href={item.href}
            flex={1}
            td={"none"}
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
          <Anchor key={item.href} component={Link} href={item.href} td={"none"}>
            <Flex
              gap={4}
              align={"center"}
              style={
                pathname === item.href
                  ? {
                      borderBottom: "2px solid #242424",
                    }
                  : undefined
              }
            >
              <Box display={"inline-flex"} ta={"center"}>
                {item.leftSection}
              </Box>
              <Text pb={4} size={"sm"}>
                {item.label}
              </Text>
            </Flex>
          </Anchor>
        ))}

      {type === "user" &&
        usreTabItem.map((item) => (
          <Anchor key={item.href} component={Link} href={item.href} td={"none"}>
            <Flex
              gap={4}
              align={"center"}
              style={
                pathname === item.href
                  ? {
                      borderBottom: "2px solid #242424",
                    }
                  : undefined
              }
            >
              <Text pb={4} size={"sm"}>
                {item.label}
              </Text>
            </Flex>
          </Anchor>
        ))}
    </Flex>
  );
}
