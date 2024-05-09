import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Avatar, Text } from "@mantine/core";
import dayjs from "dayjs";

import LikeButton from "@/app/(home)/_components/like-button";
import NoPostCard from "@/app/(home)/_components/no-post-card";
import { getPostsByUserId } from "@/lib/db/post";
import c from "@/styles/components/dashboard/list-card.module.css";

export default async function PostList({ id }: { id: string }) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const posts = await getPostsByUserId(id);

  const isPosts = posts.length !== 0;

  return (
    <>
      {!isPosts ? (
        <div className={c.no_card}>
          <NoPostCard type={"dashboard"}>まだ記録がありません</NoPostCard>
        </div>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id} className={c.card}>
              <div className={c.content}>
                <Avatar size={32} radius={"sm"} src={post.user.image} />

                <div className={c.right}>
                  <div className={c.right_top}>
                    <div className={c.right_top_content}>
                      <Text size="sm">{`@${post.user.name}`}</Text>
                      <Text size="xs">
                        {dayjs(post.created_at).format("YYYY.MM.DD")}
                      </Text>
                    </div>
                  </div>

                  <p className={c.content}>{post.content}</p>

                  <div className={c.info}>
                    <Text size="sm" fw={"bold"}>
                      {post.project.title}
                    </Text>
                    {post.is_done && (
                      <div className={c.label}>
                        <p>Done</p>
                      </div>
                    )}
                  </div>

                  <div className={c.button_wrapper}>
                    <LikeButton
                      isLike={post.like.length !== 0}
                      postId={post.id}
                    />
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
