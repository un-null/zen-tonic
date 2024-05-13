"use client";

import { ReactNode } from "react";

import { Button } from "@mantine/core";

import {
  disallowRequest,
  requestFollowForProfile,
} from "@/lib/action/user/follow";

type Props = {
  children: ReactNode;
};

type FollowBtn = Props & {
  type: "follow";
  id: string;
  follower_id?: string;
  followee_id?: string;
};

type UnFollowBtn = Props & {
  type: "unfollow";
  id?: never;
  follower_id?: string;
  followee_id?: string;
};

export default function FollowButton({
  children,
  type,
  id,
  follower_id = "",
  followee_id = "",
}: FollowBtn | UnFollowBtn) {
  if (type === "follow") {
    return (
      <Button
        size={"xs"}
        bg={"#e06259"}
        onClick={async () => await disallowRequest(id)}
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
        await requestFollowForProfile(follower_id, followee_id)
      }
    >
      {children}
    </Button>
  );
}
