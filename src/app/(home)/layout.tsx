import type { Metadata } from "next";

import { Box, Container } from "@mantine/core";

import CraeteButton from "./_components/create-button";
import FixedButton from "./_components/fixed-button";
import Header from "./_components/header";

export const metadata: Metadata = {
  title: "Timeline | All",
  description: "Generated by create next app",
};

export default async function TimelineLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <Container size={"md"} mih={"100dvh"} pos={"relative"}>
      <Header>
        <CraeteButton type={"button"} />
      </Header>

      <Box w={{ base: "100%", xs: 576 }} mx={"auto"} component={"main"}>
        {children}
      </Box>

      {/* Fix props and isPostedToday branch */}
      <FixedButton>
        <CraeteButton type={"button"} />
      </FixedButton>

      {modal}
    </Container>
  );
}
