import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Avatar, Button, Title } from "@mantine/core";

import { getFollowById } from "@/lib/db/follow";
import { getUserDetail } from "@/lib/db/user";
import c from "@/styles/components/dashboard/user-info.module.css";

import FollowButton from "../follow-button";

export default async function UserDetailInfo({ id }: { id: string }) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const dbUser = await getUserDetail(id);
  const follow = await getFollowById(user.id, id);

  const isFollow = !!follow;
  const isNotOwn = user.id !== id;

  return (
    <div className={c.container}>
      <div className={c.hero} />
      <div className={c.wrapper}>
        <Avatar mt={-36} src={dbUser?.image} w={72} h={72} radius={"xs"} />

        <div className={c.u_main}>
          <Title order={2}>{dbUser?.name}</Title>
          {isNotOwn &&
            (isFollow ? (
              follow.status ? (
                <div className={c.btn_wrapper}>
                  <FollowButton
                    type={"follow"}
                    id={follow.id}
                    follower_id={follow.follower_id}
                    followee_id={follow.followee_id}
                  >
                    フォロー解除
                  </FollowButton>
                  {follow.status && <span>フォローされています</span>}
                </div>
              ) : (
                <div className={c.btn_wrapper}>
                  <Button size={"xs"} disabled>
                    友達申請済み
                  </Button>
                </div>
              )
            ) : (
              <div className={c.btn_wrapper}>
                <FollowButton
                  type={"unfollow"}
                  follower_id={user.id}
                  followee_id={id}
                >
                  友達申請
                </FollowButton>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
