import { ReactNode } from "react";
import Link from "next/link";

import { Button, Card, Flex, Group, RingProgress, Text } from "@mantine/core";
import { Project } from "@prisma/client";
import dayjs from "dayjs";
import {
  Calendar,
  CopyCheck,
  PenLine,
  Repeat2,
  StickyNote,
  Trash2,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

type CardItem = {
  icon: ReactNode;
  label: string;
  key?: "weekDays" | "total_date" | "if_then";
};

const cardItems = [
  {
    icon: <Calendar size="1rem" style={{ marginRight: 8 }} />,
    label: "期間",
  },
  {
    icon: <Repeat2 size="1rem" style={{ marginRight: 8 }} />,
    label: "頻度",
    key: "weekDays",
  },
  {
    icon: <CopyCheck size="1rem" style={{ marginRight: 8 }} />,
    label: "日数",
    key: "total_date",
  },
  {
    icon: <StickyNote size="1rem" style={{ marginRight: 8 }} />,
    label: "if-then",
    key: "if_then",
  },
] satisfies CardItem[];

export default async function PageDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = await prisma.project.findFirst({
    where: {
      id: params.slug,
    },
  });
  const posts = await prisma.post.findMany({
    where: {
      project_id: params.slug,
    },
  });

  const progress = Math.round((posts.length / project?.total_date!) * 100);

  const getClosestWeekday = ({
    weekDays,
    total_date,
    start_date,
    end_date,
  }: Pick<Project, "weekDays" | "total_date" | "start_date" | "end_date">) => {
    const targetDays = weekDays.split(",").map((day) => day.trim());
    const startDate = dayjs(start_date);
    const endDate = dayjs(end_date);

    const closestDate = [...Array(total_date)].reduce(
      (closest, _, i) => {
        const currentDate = startDate.add(i, "day");

        if (targetDays.includes(currentDate.format("ddd"))) {
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
    weekDays: project?.weekDays!,
    total_date: project?.total_date!,
    start_date: project?.start_date!,
    end_date: project?.end_date!,
  });

  return (
    <Flex gap={32} direction={"column"}>
      <Card shadow="xs" padding="lg" radius="sm" withBorder>
        <Flex align={"center"} gap={32} pb={16} px={16}>
          <Flex flex={1} gap={4} direction={"column"}>
            <Text size={"xl"} fw={600}>
              {project?.title}
            </Text>
          </Flex>
          <Group>
            <Button
              href={"/dashboard/settings"}
              component={Link}
              variant={"outline"}
              c={"dark.8"}
              p={4}
              style={{ borderColor: "#C9C9C9", aspectRatio: 1 }}
            >
              <PenLine size={20} />
            </Button>
            <Button
              href={"/dashboard/settings"}
              component={Link}
              variant={"outline"}
              c={"dark.8"}
              p={4}
              style={{ borderColor: "#C9C9C9", aspectRatio: 1 }}
            >
              <Trash2 size={20} />
            </Button>
          </Group>
        </Flex>
        {cardItems.map((item) => (
          <Flex
            key={item.label}
            align={"center"}
            gap={32}
            py={16}
            style={{ borderTop: "1px solid #C9C9C9" }}
          >
            <Flex key={item.label} align={"center"}>
              <Text
                size={"sm"}
                px={16}
                display={"inline-flex"}
                style={{ alignItems: "center" }}
                w={144}
              >
                {item.icon}
                {item.label}
              </Text>
              <Text size={"sm"}>
                {item.key && project?.[item.key]}
                {!item.key &&
                  `${dayjs(project?.start_date).format("YYYY/MM/DD")} - ${dayjs(project?.end_date).format("YYYY/MM/DD")}`}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Card>

      <Card shadow="xs" padding="lg" radius="sm" withBorder>
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
              次の記録日:{" "}
              <Text span ml={16} fw={600}>
                {closestDate.format("YYYY/MM/DD")}
              </Text>
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
