import React from "react";
import { User } from "../types";
import { DefaultListItem } from "./DefaultListItem";
import { EditableListItem } from "./EditablelistItem";

export type ListItemProps = {
    readonly user: User;
    readonly editUserId: number | undefined;
  };

export const ListItem: React.FC<ListItemProps> = ({
  user,
  editUserId
}) => {
  return user.id === editUserId ? (
    <EditableListItem user={user} />
  ) : (
    <DefaultListItem user={user} />
  );
};
