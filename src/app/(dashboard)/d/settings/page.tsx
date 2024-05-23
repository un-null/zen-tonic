import { Suspense } from "react";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";

import { UserDetailInfoSkeleton } from "@/components/layout/skeltons";
import DeleteAccountCard from "@/components/routes/settings/delete-account-card";
import SyncCard from "@/components/routes/settings/sync-card";
import UserSettingInfo from "@/components/routes/settings/user-setting";
import { getInProgressProject } from "@/features/db/project";
import { getTodaysSyncData } from "@/features/db/sync";
import c from "@/styles/page/settings.module.css";

export default async function Settings() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const [project, todaySyncData] = await Promise.all([
    getInProgressProject(user.id),
    getTodaysSyncData(user.id),
  ]);

  const isExecuted =
    todaySyncData?.executed_at.getDate() === new Date().getDate();

  const isProject = !!project;

  return (
    <div className={c.container}>
      <Suspense fallback={<UserDetailInfoSkeleton />}>
        <UserSettingInfo />
      </Suspense>

      <div className={c.main}>
        <SyncCard
          userId={user.id}
          disabled={isExecuted}
          isProject={isProject}
        />
        <DeleteAccountCard userId={user.id} />
      </div>
    </div>
  );
}
