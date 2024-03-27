import { notFound } from "next/navigation";

import { Card, Flex, RingProgress, Text } from "@mantine/core";
import { Project } from "@prisma/client";
import dayjs from "dayjs";

import { prisma } from "@/lib/prisma";

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
  });

  if (!project) {
    notFound();
  }

  const progress = Math.round((posts.length / project?.total_date!) * 100);

  const getClosestWeekday = ({
    week_days,
    total_date,
    start_date,
    end_date,
  }: Pick<Project, "week_days" | "total_date" | "start_date" | "end_date">) => {
    const targetDays = week_days?.split(",").map((day) => day.trim());
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
    <Card w="auto" shadow="xs" padding="lg" radius="sm" withBorder>
      <Flex direction={"column"}>
        <Text size={"xl"} px={16} pb={16} fw={600}>
          達成率
        </Text>
        <Flex gap={32} align={"center"}>
          <RingProgress
            label={
              <Text size="md" ta="center" fw={600}>
                {progress} %
              </Text>
            }
            roundCaps
            sections={[{ value: progress, color: "#2483e2" }]}
            size={150}
            thickness={16}
          />
          <Text size={"lg"} px={16} pb={16} fw={600}>
            次の記録日:
            <Text span ml={16} fw={600}>
              {closestDate?.format("YYYY/MM/DD")}
            </Text>
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}
