import { Suspense } from "react";

import {
  PostCardSkeleton,
  UserDetailInfoSkeleton,
} from "@/components/layout/skeltons";
import PostList from "@/components/routes/user/post-list";
import UserDetailInfo from "@/components/routes/user/user-info";
import c from "@/styles/page/user-id.module.css";

export default async function UserIdPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className={c.container}>
      <Suspense fallback={<UserDetailInfoSkeleton />}>
        <UserDetailInfo id={params.id} />
      </Suspense>

      <Suspense fallback={<PostCardSkeleton />}>
        <PostList id={params.id} />
      </Suspense>
    </div>
  );
}
