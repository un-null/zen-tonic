"use client";

import { Button, Group } from "@mantine/core";

import { allowFollowRequest, disallowRequest } from "@/lib/action/user/follow";

export default function RequestButtons({ id }: { id: string }) {
  return (
    <Group>
      <Button
        size={"xs"}
        bg={"#2483e2"}
        onClick={async () => await allowFollowRequest(id)}
      >
        許可する
      </Button>
      <Button size={"xs"} onClick={async () => await disallowRequest(id)}>
        却下する
      </Button>
    </Group>
  );
}
