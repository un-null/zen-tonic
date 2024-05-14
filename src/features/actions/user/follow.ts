"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/features/lib/prisma";

export const requestFollowForProfile = async (
  followerId: string,
  followeeId: string,
) => {
  try {
    await prisma.follow.create({
      data: {
        follower_id: followerId,
        followee_id: followeeId,
        status: false,
      },
    });
  } catch (e) {
    throw new Error("友達申請に失敗しました");
  }

  revalidatePath(`/d/user/[id]`, "page");
  redirect(`/d/user/${followeeId}`);
};

export const requestFollowForTimeline = async (
  followerId: string,
  followeeId: string,
) => {
  try {
    await prisma.follow.create({
      data: {
        follower_id: followerId,
        followee_id: followeeId,
        status: false,
      },
    });
  } catch (e) {
    throw new Error("友達申請に失敗しました");
  }

  revalidatePath(`/`);
  redirect(`/`);
};

export const allowFollowRequest = async (reqId: string) => {
  try {
    await prisma.follow.update({
      where: {
        id: reqId,
      },
      data: {
        status: true,
      },
    });
  } catch (e) {
    throw new Error("友達申請の許可に失敗しました");
  }

  revalidatePath("/d/notice/request");
  redirect("/d/notice/request");
};

export const disallowRequest = async (reqId: string) => {
  try {
    await prisma.follow.deleteMany({
      where: {
        id: {
          in: [reqId],
        },
      },
    });
  } catch (e) {
    throw new Error("フォローの解除に失敗しました");
  }

  revalidatePath("/d/notice/request");
  redirect("/d/notice/request");
};

export const deleteFollowForTimelineAll = async (reqId: string) => {
  try {
    await prisma.follow.deleteMany({
      where: {
        id: {
          in: [reqId],
        },
      },
    });
  } catch (e) {
    throw new Error("フォローの解除に失敗しました");
  }

  revalidatePath("/");
  redirect("/");
};

export const deleteFollowForTimelineFriends = async (reqId: string) => {
  try {
    await prisma.follow.deleteMany({
      where: {
        id: {
          in: [reqId],
        },
      },
    });
  } catch (e) {
    throw new Error("フォローの解除に失敗しました");
  }

  revalidatePath("/friends");
  redirect("/friends");
};
