import { Box } from "@mantine/core";

import Tab from "@/app/(home)/_components/tab";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box>
      <Box mt={32}>
        <Tab type={"user"} />
        <Box mt={32} px={16}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
