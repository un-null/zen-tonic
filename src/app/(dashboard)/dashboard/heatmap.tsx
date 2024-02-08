"use client";

import "react-calendar-heatmap/dist/styles.css";

import { Card, Flex, Title } from "@mantine/core";
import CalendarHeatmap from "react-calendar-heatmap";

export default function HeatMap({ dateArr }: { dateArr: { date: string }[] }) {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
  const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

  return (
    <Card shadow="xs" padding="lg" radius="sm" withBorder>
      <Flex gap={32} direction={"column"}>
        <Title order={5}>アクティビティ</Title>
        {/* Fix color  */}
        <CalendarHeatmap
          startDate={startOfYear}
          endDate={endOfYear}
          values={dateArr}
        />
      </Flex>
    </Card>
  );
}
