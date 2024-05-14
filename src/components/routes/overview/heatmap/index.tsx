"use client";

import "react-calendar-heatmap/dist/styles.css";

import { Box, Card, ScrollArea, Title } from "@mantine/core";
import CalendarHeatmap from "react-calendar-heatmap";

import c from "./index.module.css";

export default function HeatMap({ dateArr }: { dateArr: { date: string }[] }) {
  const today = new Date();
  const startOfYear = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
  const endOfYear = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);

  return (
    <Card shadow="xs" className={c.card}>
      <div className={c.content}>
        <Title order={5}>アクティビティ</Title>

        <ScrollArea type={"always"} w={{ base: 252, xs: 436, sm: 636 }}>
          <Box w={768}>
            <CalendarHeatmap
              startDate={startOfYear}
              endDate={endOfYear}
              values={dateArr}
              classForValue={(value) => {
                if (!value) {
                  return "color-empty";
                }
                return "color-notion";
              }}
            />
          </Box>
        </ScrollArea>
      </div>
    </Card>
  );
}
