import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Text } from "@mantine/core";
import dayjs from "dayjs";

import { getFollows } from "@/features/db/follow";
import { getAllPosts, getUserLatestPosts } from "@/features/db/post";
import c from "@/styles/layout/list-card.module.css";

import CraeteButton from "../../components/common/create-button";
import LikeButton from "../../components/common/like-button";
import PostMenu from "../../components/common/post-menu";
import UserMenu from "../../components/common/user-menu";
import NoPostCard from "../../components/layout/no-post-card";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const [allPosts, follows, latestPost] = await Promise.all([
    getAllPosts(),
    getFollows(user.id),
    getUserLatestPosts(user.id),
  ]);

  const isPostedToday =
    latestPost?.created_at.getDate() === new Date().getDate();

  return (
    <ul className={c.container}>
      {!isPostedToday && (
        <NoPostCard type={"timeline"}>
          <CraeteButton type={"text"} />
        </NoPostCard>
      )}

      {allPosts.map((post) => (
        <li key={post.id} className={c.card}>
          <div className={c.content}>
            <UserMenu
              followerId={user.id}
              followeeId={post.user.id}
              follows={follows}
              avatar={post.user.image}
            />

            <div className={c.right}>
              <div className={c.right_top}>
                <div className={c.right_top_content}>
                  <Text size="sm">{`@${post.user.name}`}</Text>
                  <Text size="xs">
                    {dayjs(post.created_at).format("YYYY.MM.DD")}
                  </Text>
                </div>

                <PostMenu postId={post.id} />
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
                <LikeButton isLike={post.like.length !== 0} postId={post.id} />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
