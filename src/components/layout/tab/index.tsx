"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Tabs } from "@mantine/core";
import { Heart, UserRoundPlus } from "lucide-react";

import c from "./index.module.css";

type Props = "home" | "notice" | "user";

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

const userTabItem = [
  {
    href: "/d/user/followee",
    label: "フォロー",
  },
  {
    href: "/d/user/follower",
    label: "フォロワー",
  },
];

export default function Tab({ type }: { type: Props }) {
  const pathname = usePathname();

  const defaultValue = (path: string) => {
    switch (path) {
      case (path = "/"):
        return "みんな";
      case (path = "/friends"):
        return "ともだち";
      case (path = "/d/notice"):
        return "いいね";
      case (path = "/d/notice/request"):
        return "リクエスト";
      case (path = "/d/user/followee"):
        return "フォロー";
      case (path = "/d/user/follower"):
        return "フォロワー";
    }
  };

  return (
    <Tabs
      defaultValue={defaultValue(pathname)}
      classNames={{ root: c.tabs, tab: type === "home" ? c.home : undefined }}
    >
      <Tabs.List>
        {type === "home" &&
          HomeTabItem.map((item) => (
            <Link key={item.label} href={item.href} className={c.link}>
              <Tabs.Tab value={item.label}>{item.label}</Tabs.Tab>
            </Link>
          ))}
        {type === "notice" &&
          NoticeTabItem.map((item) => (
            <Link key={item.label} href={item.href}>
              <Tabs.Tab value={item.label}>{item.label}</Tabs.Tab>
            </Link>
          ))}

        {type === "user" &&
          userTabItem.map((item) => (
            <Link key={item.label} href={item.href}>
              <Tabs.Tab value={item.label}>{item.label}</Tabs.Tab>
            </Link>
          ))}
      </Tabs.List>
    </Tabs>
  );
}
