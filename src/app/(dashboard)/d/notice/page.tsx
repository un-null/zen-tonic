import { currentUser } from "@clerk/nextjs";
import { Avatar, Text } from "@mantine/core";
import dayjs from "dayjs";

import NoPostCard from "@/components/layout/no-post-card";
import { getAllLikes } from "@/features/db/like";
import c from "@/styles/layout/list-card.module.css";

export default async function Notice() {
  const user = await currentUser();

  const allLikes = await getAllLikes(user?.id);

  const isAllLikes = allLikes.length !== 0;

  return (
    <>
      {!isAllLikes ? (
        <NoPostCard type={"dashboard"}>いいねがまだ届いていません</NoPostCard>
      ) : (
        <ul className={c.container}>
          {allLikes.map((like) => (
            <li key={like.id} className={c.card}>
              <div className={c.content}>
                <Avatar size={"md"} radius={"sm"} src={like.user.image} />

                <div className={c.right}>
                  <div className={c.right_top}>
                    <div className={c.right_top_content}>
                      <Text size="sm">{`@${like.user.name}`}</Text>
                      <Text size="xs">
                        {dayjs(like.created_at).format("YYYY.MM.DD")}
                      </Text>
                    </div>
                  </div>

                  <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                    {like.user.name} さんがあなたの投稿にいいねをしました
                  </Text>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
