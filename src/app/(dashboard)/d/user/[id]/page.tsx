import { Suspense } from "react";

import c from "@/styles/page/user-id.module.css";

import {
  PostCardSkeleton,
  UserDetailInfoSkeleton,
} from "../../../../(home)/_components/skeletons";
import PostList from "./post-list";
import UserDetailInfo from "./user-info";

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
