"use client";

import { ReactNode } from "react";

import { Button } from "@mantine/core";

export default function FollowButton({ children }: { children: ReactNode }) {
  return <Button size={"xs"}>{children}</Button>;
}
