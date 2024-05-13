import { Suspense } from "react";

import c from "@/styles/page/overview.module.css";

import {
  HeatmapSkeleton,
  UserInfoSkeleton,
} from "../../../(home)/_components/skeletons";
import HeatMapWrapper from "./heatmap-wrapper";
import UserInfo from "./user-info";

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
