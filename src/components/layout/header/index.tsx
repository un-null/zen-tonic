"use client";

import Link from "next/link";

import { Avatar, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import CraeteButton from "../../common/create-button";
import LinkButton from "../../common/link-button";
import Tab from "../tab";
import c from "./index.module.css";

export default function Header() {
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  return (
    <header className={c.container}>
      {!isMobile ? (
        <div className={c.content}>
          <Link href={"/"}>
            <Avatar size={"lg"} radius={"sm"} src={"/logo.svg"} />
          </Link>

          <Tab type="home" />
          <CraeteButton type={"button"} />
        </div>
      ) : (
        <div>
          <div className={c.content}>
            <Link href={"/"}>
              <Avatar size={"lg"} radius={"sm"} src={"/logo.svg"} />
            </Link>
            <div>
              <LinkButton type={"dashboard"} />
            </div>
          </div>

          <div>
            <Tab type="home" />
          </div>
        </div>
      )}
    </header>
  );
}
