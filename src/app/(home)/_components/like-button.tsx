"use client";

import { useOptimistic } from "react";

import { ActionIcon } from "@mantine/core";
import { Heart } from "lucide-react";

import { addLike } from "@/lib/action/like/add-like";

export default function LikeButton({
  postId,
  isLike,
}: {
  postId: string;
  isLike: boolean;
}) {
  const [optimisticState, addOptimistic] = useOptimistic(isLike, (state, _) => {
    return !state;
  });

  return (
    <ActionIcon
      variant={"outline"}
      radius={"xl"}
      size={"md"}
      color={optimisticState ? "#F91980" : "#C9C9C9"}
      disabled={isLike ? isLike : optimisticState}
      onClick={async () => {
        addOptimistic(() => !optimisticState && !optimisticState);
        await addLike(postId);
      }}
    >
      <Heart
        color={optimisticState ? "#F91980" : "#C9C9C9"}
        style={{ width: "60%", height: "60%" }}
        fill={optimisticState ? "#F91980" : "white"}
      />
    </ActionIcon>
  );
}
