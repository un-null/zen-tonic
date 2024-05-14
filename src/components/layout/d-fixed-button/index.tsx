"use client";

import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import LinkButton from "../../common/link-button";
import c from "./index.module.css";

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
