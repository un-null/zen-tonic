import { Suspense } from "react";

import {
  ProjectDetailInfoSkeleton,
  ProjectProgressSkeleton,
} from "@/components/layout/skeltons";
import Progress from "@/components/routes/project/progress";
import ProjectInfo from "@/components/routes/project/project-info";
import c from "@/styles/page/project-id.module.css";

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
        <div className={c.progress}>
          <Progress id={params.id} />
        </div>
      </Suspense>
    </div>
  );
}
