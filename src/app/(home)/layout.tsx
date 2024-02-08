import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Avatar, Box, Container } from "@mantine/core";

import { prisma } from "@/lib/prisma";

import CraeteButton from "./create-button";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Generated by create next app",
};

export default async function TimelineLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();

  const projects = await prisma.project.findMany({
    where: {
      user_id: user?.id,
    },
  });

  if (!projects) {
    redirect("/setup");
  }

  const projectTitleArr = projects.map((project) => project.title);

  return (
    <Container
      display={"grid"}
      size={"md"}
      mih={"100dvh"}
      style={{
        gridTemplateRows: "1fr auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          minHeight: "full",
        }}
      >
        <Box component="aside" pt={12}>
          <Avatar size={"lg"} radius={"sm"} />
        </Box>
        <Box component="main" w={"36em"} mx={"auto"}>
          {children}
        </Box>
        <Box component="aside" pt={16}>
          <CraeteButton projects={projectTitleArr} />
        </Box>
      </div>
    </Container>
  );
}
