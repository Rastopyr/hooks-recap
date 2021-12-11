import React from "react";
import { User } from "../types";
import { ListItem, ListItemProps } from "./ListItem";

export type ListProps = {
  readonly users: readonly User[];
} & Omit<ListItemProps, "user">;

export const List: React.FC<ListProps> = React.memo(
  ({ users, onDelete, onCancelEdit, onEdit, onSave, editUserId }) => {
    return (
      <ul className="list-group">
        {users.map((user) => {
          return (
            <ListItem
              key={user.id}
              user={user}
              onDelete={onDelete}
              onCancelEdit={onCancelEdit}
              onEdit={onEdit}
              onSave={onSave}
              editUserId={editUserId}
            />
          );
        })}
      </ul>
    );
  }
);
