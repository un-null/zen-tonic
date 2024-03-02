"use client";

import { Button, Loader } from "@mantine/core";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type={"submit"} disabled={pending}>
      {pending ? <Loader size={"sm"} /> : "作成"}
    </Button>
  );
}
