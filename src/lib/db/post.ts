import { prisma } from "../prisma";
import { getFollowees } from "./follow";

// Fix name to identify async

export const getUserLatestPosts = (userId: string) => {
  return prisma.post.findFirst({
    where: {
      user_id: userId,
    },
    orderBy: { created_at: "desc" },
  });
};

export const getAllPosts = () => {
  return prisma.post.findMany({
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      created_at: true,
      content: true,
      project: {
        select: {
          title: true,
          start_date: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      // Fix get only first data  ???
      like: true,
    },
  });
};

export const getPostsByUserId = (userId: string) => {
  return prisma.post.findMany({
    where: {
      user_id: userId,
    },
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      created_at: true,
      content: true,
      project: {
        select: {
          title: true,
          start_date: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      // Fix get only first data  ???
      like: true,
    },
  });
};
export const getFolloweeAllPosts = async (userId: string) => {
  const followees = await getFollowees(userId);

  const followingIds = followees?.map((user) => user.followee_id);

  return await prisma.post.findMany({
    where: {
      user_id: {
        in: followingIds ? [...followingIds, userId] : [userId],
      },
    },
    orderBy: { created_at: "desc" },
    select: {
      id: true,
      created_at: true,
      content: true,
      project: {
        select: {
          title: true,
          start_date: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      // Fix get only first data  ???
      like: true,
    },
  });
};
