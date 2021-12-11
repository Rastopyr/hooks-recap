import React from "react";
import { useListState } from "../context";
import { User } from "../types";
import { ListItem, ListItemProps } from "./ListItem";

export type ListProps = {
  readonly users: readonly User[];
} & Omit<ListItemProps, "user">;


export const List: React.FC = () => {
  const [state] = useListState();

  return <ListView
    users={state.users}
    editUserId={state.editUserId}
  />
};


export const ListView: React.FC<ListProps> = React.memo(
  ({ users, editUserId }) => {
    return (
      <ul className="list-group">
        {users.map((user) => {
          return (
            <ListItem
              key={user.id}
              user={user}
              editUserId={editUserId}
            />
          );
        })}
      </ul>
    );
  }
);
