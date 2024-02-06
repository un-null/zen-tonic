import { Box, TabsPanel } from "@mantine/core";

import Tab from "./home-tab";
import NoPostCard from "./no-post-card";
import PostCard from "./post-card";

export default async function Home() {
  return (
    <Tab>
      <Box my={40}>
        <TabsPanel value="all">
          <PostCard />
          <PostCard />
          <PostCard />
        </TabsPanel>
        <TabsPanel value="friends">
          <NoPostCard />
        </TabsPanel>
      </Box>
    </Tab>
  );
}
