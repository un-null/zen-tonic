import { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Anchor, Avatar, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { Calendar, Clipboard } from "lucide-react";

import { getInProgressProject } from "@/lib/db/project";
import { getUserCreatedAt } from "@/lib/db/user";
import c from "@/styles/components/dashboard/user-info.module.css";

type CardItem = {
  icon: ReactNode;
  label: string;
  content?: string;
  href?: string;
};

export default async function UserInfo() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const [inProgressProject, dbUser] = await Promise.all([
    getInProgressProject(user.id),
    getUserCreatedAt(user.id),
  ]);

  const cardItems = [
    {
      icon: <Calendar size="1rem" style={{ marginRight: 8 }} />,
      content: dbUser?.created_at
        ? dayjs(dbUser.created_at).format("YYYY/MM/DD")
        : "",
      label: "利用開始",
    },
    {
      icon: <Clipboard size="1rem" style={{ marginRight: 8 }} />,
      label: "取り組み中",
      content: inProgressProject?.title ? inProgressProject?.title : "未設定",
      href: inProgressProject
        ? `/d/project/${inProgressProject?.id}`
        : "/d/project",
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
