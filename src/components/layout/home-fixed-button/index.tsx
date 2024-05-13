"use client";

import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import CraeteButton from "../../common/create-button";
import LinkButton from "../../common/link-button";
import c from "./index.module.css";

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
