import Link from "next/link";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Avatar } from "@mantine/core";

import NoPostCard from "@/components/layout/no-post-card";
import { getFolloweeList } from "@/features/db/follow";
import c from "@/styles/components/dashboard/user-card.module.css";

export default async function Followee() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const followees = await getFolloweeList(user.id);
  const filterdFollowees = followees?.filter((user) => user.status === true);

  const isFollowee = filterdFollowees?.length !== 0;

  return (
    <>
      {!isFollowee ? (
        <NoPostCard type={"dashboard"}>まだ誰もフォローしていません</NoPostCard>
      ) : (
        <ul>
          {filterdFollowees?.map((user) => (
            <li key={user.followee.id} className={c.card}>
              <div className={c.content}>
                <Avatar size={"md"} radius={"sm"} src={user.followee.image} />

                <Link href={`/d/user/${user.followee.id}`} className={c.link}>
                  {user.followee.name}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
