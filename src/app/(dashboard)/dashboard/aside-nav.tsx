"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useClerk } from "@clerk/nextjs";
import { Anchor, Button, Flex, NavLink } from "@mantine/core";
import {
  ArrowLeft,
  Bell,
  ClipboardList,
  LayoutTemplate,
  LogOut,
  Settings,
} from "lucide-react";

export default function AsideNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();

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
      href:
        pathname === "/dashboard/notice"
          ? "/dashboard/notice"
          : "/dashboard/notice/request",
    },
    {
      leftSection: <Settings size="1rem" />,
      label: "設定",
      href: "/dashboard/settings",
    },
  ];

  return (
    <Flex>
      <Flex
        component="aside"
        pt={40}
        pb={16}
        w={"12.5em"}
        direction={"column"}
        style={{ borderRight: "1px solid #cecece" }}
        display={{ base: "none", md: "flex" }}
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
        <Button
          c="#e06259"
          mx={"auto"}
          variant={"transparent"}
          rightSection={<LogOut size={16} />}
          onClick={() => signOut(() => router.push("/"))}
        >
          ログアウト
        </Button>
      </Flex>
    </Flex>
  );
}
