import { Box, Title } from "@mantine/core";

import UserCard from "./user-card";

export default async function Dashboard() {
  return (
    <Box>
      <Title order={2}>ダッシュボード</Title>
      <Box mt={32}>
        <UserCard />
      </Box>
    </Box>
  );
}
