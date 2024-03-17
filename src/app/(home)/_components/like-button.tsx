"use client";

import { useState } from "react";

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
  const [isLikeState, setIsLike] = useState(isLike);

  console.log(isLikeState);

  return (
    <ActionIcon
      variant={"outline"}
      radius={"xl"}
      size={"md"}
      color={isLikeState ? "#F91980" : "#C9C9C9"}
      disabled={isLike ? isLike : isLikeState}
      onClick={async () => {
        await addLike(postId);
        setIsLike(() => !isLikeState && !isLikeState);
      }}
    >
      <Heart
        color={isLikeState ? "#F91980" : "#C9C9C9"}
        style={{ width: "60%", height: "60%" }}
        fill={isLikeState ? "#F91980" : "white"}
      />
    </ActionIcon>
  );
}
