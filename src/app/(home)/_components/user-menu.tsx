"use client";

import Link from "next/link";

import {
  Avatar,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuTarget,
} from "@mantine/core";
import { Follow } from "@prisma/client";

type Props = {
  followerId: string;
  followeeId: string;
  avatar: string | null;
  follows?: Follow[];
};

export default function UserMenu({ follows, followeeId, avatar }: Props) {
  const follow = follows?.filter((d) => d.followee_id === followeeId);

  return (
    <Menu position={"bottom-end"}>
      <MenuTarget>
        <Avatar
          size={32}
          radius={"xs"}
          src={avatar}
          style={{ cursor: "pointer" }}
        />
      </MenuTarget>

      <MenuDropdown>
        <MenuItem
          component={Link}
          href={`/d/user/${followeeId}`}
          style={{ fontSize: 12 }}
        >
          詳細
        </MenuItem>

        {follow?.length === 0 ? (
          followeeId !== followeeId ? (
            <MenuItem c={"#2483e2"} style={{ fontSize: 12 }}>
              友達申請
            </MenuItem>
          ) : null
        ) : (
          <MenuItem c={"#e06259"} style={{ fontSize: 12 }}>
            フォロー解除
          </MenuItem>
        )}
      </MenuDropdown>
    </Menu>
  );
}
