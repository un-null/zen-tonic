import { currentUser } from "@clerk/nextjs";

import { prisma } from "@/lib/prisma";
import c from "@/styles/components/dashboard/heatmap.module.css";

import HeatMap from "./heatmap";

export default async function HeatMapWrapper() {
  const user = await currentUser();

  const inProgressProject = await prisma.project.findFirst({
    where: {
      user_id: user?.id,
    },
    orderBy: { start_date: "desc" },
    select: {
      id: true,
      title: true,
      start_date: true,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      project_id: inProgressProject?.id,
    },
    orderBy: { created_at: "desc" },
  });

  const dateArr = posts.map((post) => {
    return {
      date: post.created_at.toISOString().substring(0, 10),
    };
  });

  return (
    <div className={c.wrapper}>
      <HeatMap dateArr={dateArr} />
    </div>
  );
}
