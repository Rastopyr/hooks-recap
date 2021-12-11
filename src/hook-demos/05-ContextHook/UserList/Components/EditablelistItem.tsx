import { useState } from "react";
import { useListState } from "../context";
import { User } from "../types";

export type EditableListItemProps = {
  readonly user: User;
  readonly onSave: (userId: number, username: string) => void;
  readonly onCancelEdit: (userId: number) => void;
};

export const EditableListItem: React.FC<Pick<EditableListItemProps, "user">> = ({ user }) => {
  const [_, actions] = useListState();

  return <EditableListItemView
    user={user}
    onSave={actions.updateUser}
    onCancelEdit={actions.cancelEditUser}
  />
} 

export const EditableListItemView: React.FC<EditableListItemProps> = ({
  user,
  onSave,
  onCancelEdit
}) => {
  const [newUsername, setNewUsername] = useState(user.username);

  return (
    <li className="list-group-item d-flex">
      <input
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        className="form-control"
        placeholder="Type new username"
      />
      <button
        style={{ cursor: "pointer" }}
        className="btn btn-primary btn-sm ms-2"
        onClick={() => onSave(user.id, newUsername)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-check"
          viewBox="0 0 16 16"
        >
          <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
        </svg>
      </button>
      <button
        style={{ cursor: "pointer" }}
        className="btn btn-danger btn-sm ms-2"
        onClick={() => onCancelEdit(user.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
    </li>
  );
};
