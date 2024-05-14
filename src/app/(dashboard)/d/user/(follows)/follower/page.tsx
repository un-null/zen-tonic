import Link from "next/link";
import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Avatar } from "@mantine/core";

import NoPostCard from "@/components/layout/no-post-card";
import { getFollowerList } from "@/features/db/follow";
import c from "@/styles/page/follow.module.css";

export default async function Follower() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const followers = await getFollowerList(user.id);
  const filterdFollowers = followers?.filter((user) => user.status === true);

  const isFollower = filterdFollowers?.length !== 0;

  return (
    <>
      {!isFollower ? (
        <NoPostCard type={"dashboard"}>まだフォロワーがいません</NoPostCard>
      ) : (
        <ul>
          {filterdFollowers?.map((user) => (
            <li key={user.follower.id} className={c.card}>
              <div className={c.content}>
                <Avatar size={"md"} radius={"sm"} src={user.follower.image} />

                <Link href={`/d/user/${user.follower.id}`} className={c.link}>
                  {user.follower.name}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
