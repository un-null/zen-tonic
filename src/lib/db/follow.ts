import { prisma } from "../prisma";

export const getFollows = (followerId: string) => {
  return prisma.follow.findMany({
    where: {
      follower_id: followerId,
    },
  });
};

export const getFollowById = async (followerId: string, followeeId: string) => {
  return await prisma.follow.findFirst({
    where: {
      follower_id: followerId,
      followee_id: followeeId,
    },
  });
};
