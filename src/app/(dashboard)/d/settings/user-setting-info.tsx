import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Avatar, Text, Title } from "@mantine/core";
import dayjs from "dayjs";
import { Calendar, Mailbox } from "lucide-react";

import { getUserDetail } from "@/lib/db/user";
import c from "@/styles/components/dashboard/user-setting-info.module.css";

export default async function UserSettingInfo() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const dbUser = await getUserDetail(user.id);

  const items = [
    {
      icon: <Mailbox size="1rem" style={{ marginRight: 8 }} />,
      content: dbUser?.email,
      label: "アドレス",
    },
    {
      icon: <Calendar size="1rem" style={{ marginRight: 8 }} />,
      content: dayjs(dbUser?.created_at).format("YYYY.MM.DD"),
      label: "利用開始",
    },
  ];

  return (
    <div className={c.container}>
      <div className={c.hero} />
      <div className={c.wrapper}>
        <Avatar mt={-36} src={dbUser?.image} w={72} h={72} radius={"xs"} />

        <div className={c.o_main}>
          <Title order={2}>{user?.firstName}</Title>
          <ul className={c.list}>
            {items.map((item) => (
              <li key={item.label} className={c.item}>
                <div className={c.left}>
                  {item.icon}
                  {item.label}
                </div>
                <Text fz={14}>{item.content}</Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
