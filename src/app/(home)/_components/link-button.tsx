"use client";

import { useState } from "react";
import Link from "next/link";

import { ActionIcon, Menu, MenuItem, MenuTarget } from "@mantine/core";
import {
  Bell,
  ClipboardList,
  LayoutTemplate,
  MoreHorizontal,
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

export default function LinkButton() {
  const [opened, setOpened] = useState(false);

  return (
    <Menu opened={opened} onChange={setOpened}>
      <MenuTarget>
        <ActionIcon
          radius={"xl"}
          variant={"outline"}
          size={"xl"}
          c={"dark.1"}
          style={{ border: "1px solid #C9C9C9" }}
        >
          <MoreHorizontal />
        </ActionIcon>
      </MenuTarget>

      <Menu.Dropdown px={16} pt={16} pb={8}>
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
      </Menu.Dropdown>
    </Menu>
  );
}
