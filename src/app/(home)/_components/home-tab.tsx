"use client";

import { ReactNode } from "react";

import { Tabs } from "@mantine/core";

export default function Tab({ children }: { children: ReactNode }) {
  return (
    <Tabs defaultValue="all" color="#202020">
      <Tabs.List grow pt={16}>
        <Tabs.Tab value="all">みんな</Tabs.Tab>
        <Tabs.Tab value="friends">友達</Tabs.Tab>
      </Tabs.List>

      {children}
    </Tabs>
  );
}
