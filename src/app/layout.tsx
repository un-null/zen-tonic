import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ClerkProvider } from "@clerk/nextjs";

import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  setup,
}: Readonly<{
  children: React.ReactNode;
  setup: React.ReactNode;
}>) {
  // const user = await currentUser();

  // const prismaUser = await prisma.user.findUnique({
  //   where: {
  //     id: user?.id,
  //   },
  //   select: {
  //     database_id: true,
  //   },
  // });

  // const isDatabaseId = !!prismaUser?.database_id;

  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <ColorSchemeScript />
        </head>
        <body className={inter.className}>
          <MantineProvider>
            {/* {!isDatabaseId ? setup : children} */}
            {setup}
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
