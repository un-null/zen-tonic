import { notFound } from "next/navigation";

import { RingProgress, Text } from "@mantine/core";
import { Project } from "@prisma/client";
import dayjs from "dayjs";

import CraeteButton from "@/components/common/create-button";
import DoneCard from "@/components/layout/done-card";
import { prisma } from "@/features/lib/prisma";

import c from "./index.module.css";

export default async function Progress({ id }: { id: string }) {
  // promise All
  const project = await prisma.project.findFirst({
    where: {
      id: id,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      project_id: id,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  if (!project) {
    notFound();
  }

  const progress = Math.round((posts.length / project?.total_date!) * 100);

  const isProgress = !!progress;
  const isDone = project.end_date < new Date();
  const isTodayPost =
    posts.length !== 0 && dayjs(posts[0]?.created_at).isSame(new Date(), "day");

  const getClosestWeekday = ({
    week_days,
    total_date,
    start_date,
    end_date,
  }: Pick<Project, "week_days" | "total_date" | "start_date" | "end_date">) => {
    if (week_days === "毎日") {
      return dayjs().add(1, "day");
    }

    const targetDays = week_days.split(",").map((day) => day.trim());
    const startDate = dayjs(start_date);
    const endDate = dayjs(end_date);

    const closestDate = [...Array(total_date)].reduce(
      (closest, _, i) => {
        const currentDate = startDate.add(i, "day");

        if (targetDays?.includes(currentDate.format("ddd"))) {
          const diff = Math.abs(currentDate.diff(endDate, "milliseconds"));
          return diff < closest.diff ? { date: currentDate, diff } : closest;
        }

        return closest;
      },
      { date: null, diff: Infinity },
    );

    return closestDate.date;
  };

  const closestDate = getClosestWeekday({
    week_days: project?.week_days!,
    total_date: project?.total_date!,
    start_date: project?.start_date!,
    end_date: project?.end_date!,
  });

  return (
    <div className={c.card}>
      {isDone ? (
        <DoneCard />
      ) : (
        <div>
          <p className={c.title}>進捗</p>
          <div className={c.content}>
            <RingProgress
              label={
                <Text size="md" ta="center" fw={600}>
                  {isProgress ? progress : 0} %
                </Text>
              }
              roundCaps
              sections={[
                { value: isProgress ? progress : 0, color: "#2483e2" },
              ]}
              size={152}
              thickness={16}
            />
            {!isTodayPost ? (
              <div className={c.button_wrapper}>
                <CraeteButton type={"text"} />
              </div>
            ) : (
              <div className={c.text}>
                次の記録日:
                <span>{closestDate?.format("YYYY/MM/DD")}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
