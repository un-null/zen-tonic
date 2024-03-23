"use client";

import { ReactNode } from "react";

import { Button } from "@mantine/core";
import { Follow } from "@prisma/client";

import { disallowRequest, requestFollow } from "@/lib/action/user/follow";

export default function FollowButton({
  type,
  follow,
  children,
}: {
  type: "follow" | "unfollow";
  follow: Follow;
  children: ReactNode;
}) {
  if (type === "follow") {
    return (
      <Button
        size={"xs"}
        bg={"#e06259"}
        onClick={async () => await disallowRequest(follow.id)}
      >
        {children}
      </Button>
    );
  }
  return (
    <Button
      size={"xs"}
      bg={"#2483e2"}
      onClick={async () =>
        await requestFollow(follow.follower_id, follow.followee_id)
      }
    >
      {children}
    </Button>
  );
}
