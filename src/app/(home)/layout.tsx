import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Avatar, Box, Container, Flex } from "@mantine/core";

import { prisma } from "@/lib/prisma";

import CraeteButton from "./create-button";
import LinkButton from "./link-button";

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
      user_id: user?.id || "",
    },
  });

  if (projects.length === 0) {
    redirect("/setup");
  }

  const projectTitleArr = projects.map((project) => project.title);

  const userLatestPost = await prisma.post.findFirst({
    where: {
      user_id: user?.id,
    },
    orderBy: { created_at: "desc" },
  });

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
        <Flex
          component="aside"
          pt={12}
          pb={32}
          align={"center"}
          direction={"column"}
        >
          <Box flex={1}>
            <Avatar size={"lg"} radius={"sm"} />
          </Box>
          <LinkButton />
        </Flex>
        <Box component="main" w={"36em"} mx={"auto"}>
          {children}
        </Box>
        <Box component="aside" pt={16}>
          {userLatestPost?.created_at.getDate() !== new Date().getDate() ? (
            <CraeteButton projects={projectTitleArr} type={"button"} />
          ) : (
            <CraeteButton projects={projectTitleArr} isDone type={"button"} />
          )}
        </Box>
      </div>
    </Container>
  );
}
