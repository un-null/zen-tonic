import Link from "next/link";

import { ActionIcon, Text } from "@mantine/core";
import { ArrowRight, Plus } from "lucide-react";

export default function CraeteButton({ type }: { type: "text" | "button" }) {
  return (
    <>
      {type === "button" && (
        <ActionIcon
          radius={"xl"}
          variant={"outline"}
          component={Link}
          href={"/add"}
          size={"xl"}
          c={"dark.1"}
          style={{ border: "1px solid #C9C9C9" }}
        >
          <Plus />
        </ActionIcon>
      )}
      {type === "text" && (
        <Text
          size={"lg"}
          display={"inline-flex"}
          td={"underline"}
          style={{ alignItems: "center", cursor: "pointer" }}
          component={Link}
          href={"/add"}
        >
          記録する
          <ArrowRight size={20} style={{ marginLeft: 2 }} />
        </Text>
      )}
    </>
  );
}
