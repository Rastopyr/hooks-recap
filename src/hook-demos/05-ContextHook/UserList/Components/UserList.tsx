import React from "react";
import { DefaultListItem, DefaultListItemProps } from "./DefaultListItem";
import { EditableListItem, EditableListItemProps } from "./EditablelistItem";

export type ListItemProps = DefaultListItemProps &
  EditableListItemProps & {
    readonly editUserId: number | undefined;
  };

export const ListItem: React.FC<ListItemProps> = ({
  user,
  editUserId,
  onEdit,
  onSave,
  onCancelEdit,
  onDelete
}) => {
  return user.id === editUserId ? (
    <EditableListItem user={user} onSave={onSave} onCancelEdit={onCancelEdit} />
  ) : (
    <DefaultListItem user={user} onEdit={onEdit} onDelete={onDelete} />
  );
};

export const ListItemView: React.FC<ListItemProps> = ({
  user,
  editUserId,
  onEdit,
  onSave,
  onCancelEdit,
  onDelete
}) => {
  return user.id === editUserId ? (
    <EditableListItem user={user} onSave={onSave} onCancelEdit={onCancelEdit} />
  ) : (
    <DefaultListItem user={user} onEdit={onEdit} onDelete={onDelete} />
  );
};
