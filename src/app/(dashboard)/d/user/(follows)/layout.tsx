import { Suspense } from "react";

import { Box, Title } from "@mantine/core";

import Tab from "@/app/(home)/_components/tab";

import { NoticeSkeleton } from "../../skeletons";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box>
      <Title order={2}>友達</Title>

      <Box mt={32}>
        <Tab type={"user"} />
        <Box mt={32} px={16}>
          <Suspense fallback={<NoticeSkeleton />}>{children}</Suspense>
        </Box>
      </Box>
    </Box>
  );
}
