import { Suspense } from "react";

import { Flex } from "@mantine/core";

import { PostCardSkeleton, UserDetailInfoSkeleton } from "../../skeletons";
import PostList from "./post-list";
import UserDetailInfo from "./user-info";

export default async function UserIdPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <Flex mt={32} direction={"column"} gap={16}>
      <Suspense fallback={<UserDetailInfoSkeleton />}>
        <UserDetailInfo id={params.id} />
      </Suspense>

      <Suspense fallback={<PostCardSkeleton />}>
        <PostList id={params.id} />
      </Suspense>
    </Flex>
  );
}
