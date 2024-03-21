"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const requestFollow = async (followerId: string, followeeId: string) => {
  await prisma.follow.create({
    data: {
      follower_id: followerId,
      followee_id: followeeId,
      status: false,
    },
  });
};

export const allowFollowRequest = async (reqId: string) => {
  await prisma.follow.update({
    where: {
      id: reqId,
    },
    data: {
      status: true,
    },
  });

  revalidatePath("/dashboard/notice/request");
  redirect("/dashboard/notice/request");
};

export const disallowRequest = async (reqId: string) => {
  await prisma.follow.deleteMany({
    where: {
      id: {
        in: [reqId],
      },
    },
  });

  revalidatePath("/dashboard/notice/request");
  redirect("/dashboard/notice/request");
};
