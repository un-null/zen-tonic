import { Suspense } from "react";

import { Title } from "@mantine/core";

import Tab from "@/components/layout/tab";
import c from "@/styles/layout/user.module.css";

import { NoticeSkeleton } from "../../../../../components/layout/skeltons";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Title order={2}>友達</Title>

      <div className={c.container}>
        <Tab type={"user"} />
        <div className={c.main}>
          <Suspense fallback={<NoticeSkeleton />}>{children}</Suspense>
        </div>
      </div>
    </div>
  );
}
