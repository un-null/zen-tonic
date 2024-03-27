import { Suspense } from "react";

import { Box, Title } from "@mantine/core";

import Tab from "@/app/(home)/_components/tab";

import { NoticeSkeleton } from "../../../(home)/_components/skeletons";

export default async function NoticeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box>
      <Title order={2}>通知</Title>
      <Box mt={32}>
        <Tab type={"notice"} />
        <Box mt={32} px={16}>
          <Suspense fallback={<NoticeSkeleton />}>{children}</Suspense>
        </Box>
      </Box>
    </Box>
  );
}
