import { Suspense } from "react";

import c from "@/styles/page/project-id.module.css";

import {
  ProjectDetailInfoSkeleton,
  ProjectProgressSkeleton,
} from "../../../../(home)/_components/skeletons";
import Progress from "./progress";
import ProjectInfo from "./project-info";

export default async function PageDetail({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className={c.container}>
      <Suspense fallback={<ProjectDetailInfoSkeleton />}>
        <ProjectInfo id={params.id} />
      </Suspense>

      <Suspense fallback={<ProjectProgressSkeleton />}>
        {/* Fix mobile width */}
        <div className={c.progress}>
          <Progress id={params.id} />
        </div>
      </Suspense>
    </div>
  );
}
