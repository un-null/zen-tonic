import { Box, TabsPanel } from "@mantine/core";

import Tab from "./home-tab";

export default async function Home() {
  return (
    <Tab>
      <Box my={40}>
        <TabsPanel value="all">みんなの投稿</TabsPanel>
        <TabsPanel value="friends">友達の投稿</TabsPanel>
      </Box>
    </Tab>
  );
}
