"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useClerk } from "@clerk/nextjs";
import {
  ActionIcon,
  Menu,
  MenuDivider,
  MenuItem,
  MenuTarget,
} from "@mantine/core";
import {
  Bell,
  ClipboardList,
  Contact,
  Home,
  LayoutTemplate,
  LogOut,
  MoreHorizontal,
  Settings,
} from "lucide-react";

const navItem = [
  {
    leftSection: <LayoutTemplate size="1rem" />,
    label: "ダッシュボード",
    href: "/d",
  },
  {
    leftSection: <ClipboardList size="1rem" />,
    label: "プロジェクト",
    href: "/d/project",
  },
  {
    leftSection: <Bell size="1rem" />,
    label: "通知",
    href: "/d/notice",
  },
  {
    leftSection: <Contact size="1rem" />,
    label: "友達",
    href: "/d/user/followee",
  },
  {
    leftSection: <Settings size="1rem" />,
    label: "設定",
    href: "/d/settings",
  },
];

export default function LinkButton({ type }: { type: "home" | "dashboard" }) {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <>
      {type === "home" && (
        <ActionIcon
          radius={"xl"}
          variant={"outline"}
          size={50}
          component={Link}
          href={"/"}
          c={"dark.1"}
          style={{ border: "1px solid #C9C9C9" }}
        >
          <Home />
        </ActionIcon>
      )}
      {type === "dashboard" && (
        <Menu opened={opened} onChange={setOpened}>
          <MenuTarget>
            <ActionIcon
              radius={"xl"}
              variant={"outline"}
              size={50}
              c={"dark.3"}
              style={{ border: "1px solid #C9C9C9" }}
            >
              <MoreHorizontal />
            </ActionIcon>
          </MenuTarget>

          <Menu.Dropdown px={{ base: 8, md: 16 }} pt={16} pb={8}>
            {navItem.map((item) => (
              <MenuItem
                key={item.label}
                leftSection={item.leftSection}
                component={Link}
                href={`${item.href}`}
                mb={8}
              >
                {item.label}
              </MenuItem>
            ))}
            <MenuDivider />

            <MenuItem
              component={"button"}
              c={"#e06259"}
              leftSection={<LogOut size={16} />}
              onClick={() => signOut(() => router.push("/"))}
            >
              ログアウト
            </MenuItem>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  );
}
