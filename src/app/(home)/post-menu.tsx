"use client";

import { useState } from "react";

import { ActionIcon, Menu, MenuItem, MenuTarget } from "@mantine/core";
import { MoreVertical, Trash2 } from "lucide-react";

import { deletePost } from "@/lib/action/post/delete-post";

const navItem = [
  {
    leftSection: <Trash2 size="1rem" />,
    label: "削除",
  },
];

export default function PostMenu({ postId }: { postId: string }) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Menu opened={opened} onChange={setOpened} position={"right-end"}>
        <MenuTarget>
          <ActionIcon size={"sm"} variant={"transparent"}>
            <MoreVertical size={18} color="#B8B8B8" />
          </ActionIcon>
        </MenuTarget>

        <Menu.Dropdown px={8} pt={8} pb={4}>
          {navItem.map((item) => (
            <MenuItem
              key={item.label}
              leftSection={item.leftSection}
              mb={4}
              onClick={async () => {
                await deletePost(postId);
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu.Dropdown>
      </Menu>
    </>
  );
}
