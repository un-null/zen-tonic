import Link from "next/link";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Text } from "@mantine/core";
import dayjs from "dayjs";
import { Clipboard, Plus } from "lucide-react";

import { prisma } from "@/lib/prisma";
import c from "@/styles/components/dashboard/project-list.module.css";

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
    <ul className={c.container}>
      {projects.map((project) => (
        <li className={c.card} key={project.id}>
          <Link key={project.id} href={`/d/project/${project.id}`}>
            <div className={c.card_top} />

            <div className={c.card_content}>
              <div className={c.card_item}>
                <Clipboard size={18} />
                <Text fw={600}>{project.title}</Text>
              </div>

              <Text size={"xs"}>
                {`${dayjs(project.start_date).format("YYYY/MM/DD")} -> ${dayjs(project.end_date).format("YYYY/MM/DD")}`}
              </Text>

              <div className={c.card_item}>
                <input
                  type="checkbox"
                  checked={new Date() > project.end_date}
                  disabled
                />
                <Text size={"xs"}>Done</Text>
              </div>
            </div>
          </Link>
        </li>
      ))}

      <li className={c.new}>
        <Link href={`/d/project/setup`}>
          <p>
            new
            <Plus size={16} />
          </p>
        </Link>
      </li>
    </ul>
  );
}
