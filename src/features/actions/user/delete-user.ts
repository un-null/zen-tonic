"use server";

import { prisma } from "@/features/lib/prisma";

export const deleteUser = (id: string) => {
  return prisma.user.deleteMany({
    where: {
      id: {
        in: [id],
      },
    },
  });
};
