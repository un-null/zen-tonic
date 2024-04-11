import { ReactNode } from "react";
import Link from "next/link";

import { currentUser } from "@clerk/nextjs";
import { Anchor, Avatar, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { Calendar, Clipboard } from "lucide-react";

import { prisma } from "@/lib/prisma";
import c from "@/styles/components/dashboard/user-info.module.css";

type CardItem = {
  icon: ReactNode;
  label: string;
  content?: string;
  href?: string;
};

export default async function UserInfo() {
  const user = await currentUser();

  // Fix: inProgressProject 取得数 + user created_at
  const inProgressProject = await prisma.project.findFirst({
    where: {
      user_id: user?.id,
    },
    orderBy: { start_date: "desc" },
    select: {
      id: true,
      title: true,
      user: {
        select: {
          created_at: true,
        },
      },
    },
  });

  const cardItems = [
    {
      icon: <Calendar size="1rem" style={{ marginRight: 8 }} />,
      content: inProgressProject?.user.created_at
        ? dayjs(inProgressProject.user.created_at).format("YYYY/MM/DD")
        : "未設定",
      label: "利用開始",
    },
    {
      icon: <Clipboard size="1rem" style={{ marginRight: 8 }} />,
      label: "取り組み中",
      content: inProgressProject?.title ? inProgressProject?.title : "未設定",
      href: `/d/project/${inProgressProject?.id}`,
    },
  ] satisfies CardItem[];

  return (
    <div className={c.container}>
      <div className={c.hero} />
      <div className={c.wrapper}>
        <Avatar mt={-36} size={72} radius={"sm"} src={user?.imageUrl} />

        <div className={c.main}>
          <Anchor component={Link} href={`/d/user/${user?.id}`}>
            <Title order={2}>{user?.firstName}</Title>
          </Anchor>
          <ul className={c.list}>
            {cardItems.map((item) => (
              <div key={item.label} className={c.item}>
                <div className={c.left}>
                  <span>{item.icon}</span>
                  {item.label}
                </div>
                {item.href ? (
                  <Anchor component={Link} href={item.href} fz={14}>
                    {item.content}
                  </Anchor>
                ) : (
                  <Text fz={14}>{item.content}</Text>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
