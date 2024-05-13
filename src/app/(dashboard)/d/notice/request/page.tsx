import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Avatar, Text } from "@mantine/core";

import NoPostCard from "@/components/layout/no-post-card";
import RequestButtons from "@/components/routes/notice/request-button";
import { getFollowsRequest } from "@/features/db/follow";
// fix css file
import c from "@/styles/components/dashboard/list-card.module.css";

export default async function Notice() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const followRequests = await getFollowsRequest(user.id);

  const isFollowRequest = followRequests.length !== 0;

  return (
    <>
      {!isFollowRequest ? (
        <NoPostCard type={"dashboard"}>友達申請がまだ届いていません</NoPostCard>
      ) : (
        <ul className={c.container}>
          {followRequests.map((req) => (
            <li key={req.id} className={c.card}>
              <div className={c.content}>
                <Avatar size={"md"} radius={"sm"} src={req.follower.image} />

                <div className={c.right}>
                  <div className={c.right_top_content}>
                    <Text size="sm">{`@${req.follower.name}`}</Text>
                  </div>

                  <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                    {req.follower.name} さんが友達申請をしました
                  </Text>
                  <div className={c.button}>
                    <RequestButtons id={req.id} />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
