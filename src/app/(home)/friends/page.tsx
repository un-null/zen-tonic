import { redirect } from "next/navigation";

import { currentUser } from "@clerk/nextjs";
import { Box } from "@mantine/core";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return <Box my={40}>Friends</Box>;
}
