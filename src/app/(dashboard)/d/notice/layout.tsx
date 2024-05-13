import { Suspense } from "react";

import { Box, Title } from "@mantine/core";

import Tab from "@/components/layout/tab";

import { NoticeSkeleton } from "../../../../components/layout/skeltons";

export default async function NoticeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Title order={2}>通知</Title>
      <Box mt={32}>
        <Tab type={"notice"} />
        <Box mt={32} px={16}>
          <Suspense fallback={<NoticeSkeleton />}>{children}</Suspense>
        </Box>
      </Box>
    </div>
  );
}
