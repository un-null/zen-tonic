import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";

import { getUserLatestPosts } from "@/lib/db/post";
import { getProjectTitles } from "@/lib/db/project";

import Modal from "./modal";

export default async function Add() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const [projectTitles, latestPost] = await Promise.all([
    getProjectTitles(user.id),
    getUserLatestPosts(user.id),
  ]);

  const projectTitleArr = projectTitles.map((project) => project.title);

  const isPostedToday =
    latestPost?.created_at.getDate() === new Date().getDate();

  return (
    <Modal
      projects={projectTitleArr}
      isDone={isPostedToday}
      username={latestPost?.user.name}
      avatar={latestPost?.user.image}
    />
  );
}
