import { prisma } from "../lib/prisma";

export const getFollows = (followerId: string) => {
  return prisma.follow.findMany({
    where: {
      follower_id: followerId,
    },
  });
};

export const getFollowees = async (userId: string) => {
  const data = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      followees: {
        select: {
          followee_id: true,
        },
      },
    },
  });
  return data?.followees;
};

export const getFolloweeList = async (userId: string) => {
  const data = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      followees: {
        select: {
          status: true,
          followee: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });
  return data?.followees;
};

export const getFollowerList = async (userId: string) => {
  const data = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      followers: {
        select: {
          status: true,
          follower: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });
  return data?.followers;
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
