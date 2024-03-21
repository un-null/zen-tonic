import { prisma } from "../prisma";

export const getFollows = (followerId: string) => {
  return prisma.follow.findMany({
    where: {
      follower_id: followerId,
    },
  });
};

export const getFollowsRequest = async (followeeId: string) => {
  return await prisma.follow.findMany({
    where: {
      followee_id: followeeId,
      status: false,
    },
    select: {
      id: true,
      status: false,
      follower: {
        select: {
          name: true,
          image: true,
        },
      },
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
