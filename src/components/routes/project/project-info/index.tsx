import { ReactNode } from "react";
import Link from "next/link";

import { Text } from "@mantine/core";
import dayjs from "dayjs";
import {
  ArrowLeft,
  Calendar,
  CopyCheck,
  Repeat2,
  StickyNote,
} from "lucide-react";

import { getProjectDetail } from "@/features/db/project";

import c from "./index.module.css";

type CardItem = {
  icon: ReactNode;
  label: string;
  content?: string;
  href?: string;
};

export default async function ProjectInfo({ id }: { id: string }) {
  const project = await getProjectDetail(id);

  const startDate = project?.start_date.toISOString().substring(0, 10);
  const endDate = project?.end_date.toISOString().substring(0, 10);

  const isDone = project?.end_date! < new Date();

  const cardItems = [
    {
      icon: <Calendar size="1rem" style={{ marginRight: 8 }} />,
      label: "期間",
      content: `${dayjs(startDate).format("YYYY/MM/DD")} - ${dayjs(endDate).format("YYYY/MM/DD")}`,
    },
    {
      icon: <CopyCheck size="1rem" style={{ marginRight: 8 }} />,
      label: "日数",
      content: String(project?.total_date),
    },
    {
      icon: <Repeat2 size="1rem" style={{ marginRight: 8 }} />,
      label: "繰り返し",
      content: project?.week_days,
    },
    {
      icon: <StickyNote size="1rem" style={{ marginRight: 8 }} />,
      label: "if_then",
      content: project?.if_then ? project.if_then : "未設定",
    },
  ] satisfies CardItem[];

  return (
    <div className={c.container}>
      <Link href={"/d/project"} className={c.link}>
        <ArrowLeft size={16} style={{ marginRight: 2 }} />
        プロジェクト一覧に戻る
      </Link>
      <div className={c.main}>
        <div className={c.content}>
          <h2>
            {project?.title}
            {isDone && <span className={c.tag}>Done</span>}
          </h2>
          <div className={c.list}>
            {cardItems.map((item) => (
              <div key={item.label} className={c.item}>
                <div className={c.left}>
                  {item.icon}
                  {item.label}
                </div>

                <Text fz={14}>{item.content}</Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
