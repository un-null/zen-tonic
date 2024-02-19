import Link from "next/link";

import { Button, Container, Flex, Text, Title } from "@mantine/core";
import { Frown } from "lucide-react";

export default function NotFound() {
  return (
    <Container miw={"md"} mx={"auto"} mt={32} component={"main"}>
      <Flex direction={"column"} align={"center"} justify={"center"} gap={16}>
        <Frown width={40} color="#e06259" />
        <Title order={3} c={"#e06259"}>
          404 Not Found
        </Title>
        <Text size={"sm"}>プロジェクトが見つかりませんでした</Text>
        <Button component={Link} href="/dashboard/project">
          プロジェクト一覧に戻る
        </Button>
      </Flex>
    </Container>
  );
}
