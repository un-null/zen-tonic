"use client";

import { Button, Container, Flex, Title } from "@mantine/core";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container miw={"md"} mx={"auto"} mt={32} component={"main"}>
      <Flex direction={"column"} align={"center"} justify={"center"} gap={32}>
        <Title order={3} c={"#e06259"}>
          エラーが発生しました
        </Title>
        <Button onClick={() => reset()}>戻る</Button>
      </Flex>
    </Container>
  );
}
