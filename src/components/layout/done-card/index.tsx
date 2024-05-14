import Image from "next/image";
import Link from "next/link";

import c from "./index.module.css";

export default function DoneCard() {
  return (
    <div className={c.container}>
      <div className={c.content}>
        <div className={c.image}>
          <Image src={"/done-image.svg"} alt="" fill />
        </div>

        <div className={c.link}>
          <Link href={"/add"}>プロジェクトを作成する</Link>
        </div>
      </div>
    </div>
  );
}
