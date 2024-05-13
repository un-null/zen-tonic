import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";

import { getPostsByProjectId } from "@/features/db/post";
import { getAsyncInProgressProject } from "@/features/db/project";
import c from "@/styles/components/dashboard/heatmap.module.css";

import HeatMap from "../heatmap";

export default async function HeatMapWrapper() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const inProgressProject = await getAsyncInProgressProject(user.id);

  const posts = await getPostsByProjectId(inProgressProject?.id);

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
