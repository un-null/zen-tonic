import Link from "next/link";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import {
  Card,
  CardSection,
  Checkbox,
  Flex,
  Group,
  SimpleGrid,
  Text,
} from "@mantine/core";
import dayjs from "dayjs";
import { Clipboard, Plus } from "lucide-react";

import { prisma } from "@/lib/prisma";

export default async function ProjectList() {
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
    <SimpleGrid cols={{ base: 1, xs: 2 }}>
      {projects.map((project) => (
        <Link
          key={project.id}
          href={`/d/project/${project.id}`}
          style={{ textDecoration: "none" }}
        >
          <Card
            style={{ aspectRatio: 1 }}
            withBorder
            maw={300}
            pt={0}
            px={16}
            mx={"auto"}
          >
            <CardSection h={185} bg={"dark.1"} />

            <Flex direction={"column"} gap={12} mt={16}>
              <Group gap={"xs"}>
                <Clipboard size={18} />
                <Text fw={600}>{project.title}</Text>
              </Group>

              {/* Fix ta  */}
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

      <Link href={`/d/project/setup`} style={{ textDecoration: "none" }}>
        <Card
          style={{ aspectRatio: 1, placeItems: "center" }}
          display={"grid"}
          withBorder
          maw={300}
          pt={0}
          px={16}
          mx={"auto"}
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
  );
}
