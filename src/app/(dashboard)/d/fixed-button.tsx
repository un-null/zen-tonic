"use client";

import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import c from "@/styles/components/dashboard/fixed-button.module.css";

import LinkButton from "../../(home)/_components/link-button";

// Fix Position
export default function FixedButton() {
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  return (
    <>
      {!isMobile ? null : (
        <div className={c.card}>
          <div className={c.content}>
            <LinkButton type={"home"} />
            <LinkButton type={"dashboard"} />
          </div>
        </div>
      )}
    </>
  );
}
