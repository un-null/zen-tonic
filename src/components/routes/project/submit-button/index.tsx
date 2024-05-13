"use client";

import { Button, Loader } from "@mantine/core";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type={"submit"} disabled={pending} bg={"dark.5"}>
      {pending ? <Loader size={"sm"} color={"gray.1"} /> : "作成"}
    </Button>
  );
}
