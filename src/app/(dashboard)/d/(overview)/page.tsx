import { Suspense } from "react";

import {
  HeatmapSkeleton,
  UserInfoSkeleton,
} from "@/components/layout/skeltons";
import HeatMapWrapper from "@/components/routes/overview/heatmap-wrapper";
import UserInfo from "@/components/routes/overview/user-info";
import c from "@/styles/page/overview.module.css";

export default async function Dashboard() {
  return (
    <div className={c.container}>
      <Suspense fallback={<UserInfoSkeleton />}>
        <UserInfo />
      </Suspense>

      <Suspense fallback={<HeatmapSkeleton />}>
        <div className={c.heatmap}>
          <HeatMapWrapper />
        </div>
      </Suspense>
    </div>
  );
}
