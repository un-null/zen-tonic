import { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import {
  Box,
  Card,
  CardSection,
  Checkbox,
  Flex,
  Group,
  SimpleGrid,
  Skeleton,
  Text,
  Title,
} from "@mantine/core";
import dayjs from "dayjs";
import { Clipboard, Plus } from "lucide-react";

import { prisma } from "@/lib/prisma";

export default async function Project() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const projects = await prisma.project.findMany({
    where: {
      user_id: user?.id,
    },
  });

  return (
    <Box>
      <Title order={2}>プロジェクト</Title>
      <Suspense
        fallback={
          <Box miw={"md"}>
            <SimpleGrid cols={2} mt={32} w={"full"}>
              <Skeleton style={{ aspectRatio: 1 }} maw={300} />
              <Skeleton style={{ aspectRatio: 1 }} maw={300} />
            </SimpleGrid>
          </Box>
        }
      >
        <SimpleGrid cols={2} mt={32} w={"100%"}>
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/project/${project.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card
                style={{ aspectRatio: 1 }}
                withBorder
                maw={300}
                pt={0}
                px={16}
              >
                <CardSection h={185} bg={"dark.1"}></CardSection>

                <Flex direction={"column"} gap={12} mt={16}>
                  <Group gap={"xs"}>
                    <Clipboard size={18} />
                    <Text fw={600}>{project.title}</Text>
                  </Group>

                  <Text size={"xs"}>
                    {`${dayjs(project.start_date).format("YYYY/MM/DD")} -> ${dayjs(project.end_date).format("YYYY/MM/DD")}`}
                  </Text>

                  <Group gap={"xs"}>
                    <Checkbox
                      size={"xs"}
                      checked={new Date() > project.end_date}
                      disabled
                    />
                    <Text size={"xs"}>Done</Text>
                  </Group>
                </Flex>
              </Card>
            </Link>
          ))}
          <Link
            href={`/dashboard/project/setup`}
            style={{ textDecoration: "none" }}
          >
            <Card
              style={{ aspectRatio: 1, placeItems: "center" }}
              display={"grid"}
              withBorder
              maw={300}
              pt={0}
              px={16}
            >
              <Text
                size={"sm"}
                display={"inline-flex"}
                mt={8}
                style={{ alignItems: "center", gap: 8 }}
              >
                new
                <Plus size={16} />
              </Text>
            </Card>
          </Link>
        </SimpleGrid>
      </Suspense>
    </Box>
  );
}
