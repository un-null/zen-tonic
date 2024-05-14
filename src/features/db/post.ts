import { prisma } from "../lib/prisma";
import { getFollowees } from "./follow";

// Fix name to identify async

export const getUserLatestPosts = (userId: string) => {
  return prisma.post.findFirst({
    where: {
      user_id: userId,
    },
    select: {
      created_at: true,
      is_done: true,
      user: {
        select: {
          name: true,
          image: true,
        },
      },
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
      is_done: true,
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

export const getPostsByProjectId = async (projectId: string = "") => {
  return await prisma.post.findMany({
    where: {
      project_id: projectId,
    },
    orderBy: { created_at: "desc" },
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
      is_done: true,
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
      is_done: true,
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
