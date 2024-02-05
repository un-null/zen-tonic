"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Anchor, Flex, NavLink } from "@mantine/core";
import {
  ArrowLeft,
  Bell,
  ClipboardList,
  LayoutTemplate,
  LogOut,
  Settings,
} from "lucide-react";

const navItem = [
  {
    leftSection: <LayoutTemplate size="1rem" />,
    label: "ダッシュボード",
    href: "/dashboard",
  },
  {
    leftSection: <ClipboardList size="1rem" />,
    label: "プロジェクト",
    href: "/dashboard/project",
  },
  {
    leftSection: <Bell size="1rem" />,
    label: "通知",
    href: "/dashboard/notice",
  },
  {
    leftSection: <Settings size="1rem" />,
    label: "設定",
    href: "/dashboard/settings",
  },
];

export default function AsideNav() {
  const pathname = usePathname();
  return (
    <Flex
      component="aside"
      pt={40}
      pb={16}
      w={"12.5em"}
      direction={"column"}
      style={{ borderRight: "1px solid #cecece" }}
    >
      <Anchor
        component={Link}
        href={"/"}
        size={"sm"}
        px={16}
        display={"inline-flex"}
        style={{ alignItems: "center" }}
      >
        <ArrowLeft size={16} style={{ marginRight: 2 }} />
        ホームに戻る
      </Anchor>
      <Flex w={"full"} mt={32} px={16} direction={"column"} gap={8} flex={1}>
        {navItem.map((item) => (
          <NavLink
            key={item.label}
            component={Link}
            href={item.href}
            active={item.href === pathname}
            label={item.label}
            leftSection={item.leftSection}
            style={{ borderRadius: "4px" }}
          />
        ))}
      </Flex>
      <Anchor
        component={Link}
        href={"/dashboard"}
        c="#e06259"
        mx={"auto"}
        display={"inline-flex"}
        style={{ alignItems: "center" }}
      >
        ログアウト
        <LogOut size={16} style={{ marginLeft: 2 }} />
      </Anchor>
    </Flex>
  );
}
