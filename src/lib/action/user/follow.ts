"use server";

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
