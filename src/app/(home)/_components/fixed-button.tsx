"use client";

import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import c from "@/styles/components/home/fixed-button.module.css";

import CraeteButton from "./create-button";
import LinkButton from "./link-button";

export default function FixedButton() {
  const isMobile = useMediaQuery(`(max-width: ${em(768)})`);

  return (
    <>
      {!isMobile ? (
        <div className={c.pc}>
          <LinkButton type="dashboard" />
        </div>
      ) : (
        <div className={c.mobile}>
          <CraeteButton type={"button"} />
        </div>
      )}
    </>
  );
}
