"use client";

import { Button } from "@mantine/core";
import { Follow } from "@prisma/client";

import { requestFollow } from "@/lib/action/user/follow";

type Props = {
  followerId: string;
  followeeId: string;
  follows?: Follow[];
};

export default function FollowButton({
  follows,
  followerId,
  followeeId,
}: Props) {
  const follow = follows?.filter((d) => d.followee_id === followeeId);

  if (follow?.length === 0) {
    return (
      <Button
        size={"xs"}
        onClick={async () => await requestFollow(followerId, followeeId)}
      >
        友達申請
      </Button>
    );
  }

  return (
    <Button size={"xs"} disabled>
      {follow?.[0].status === true ? "すでに友達です" : "友達申請済み"}
    </Button>
  );
}
