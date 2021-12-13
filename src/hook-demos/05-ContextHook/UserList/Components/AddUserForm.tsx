import { useState } from "react";
import { useListState } from "../context";

type AddUserFormProps = {
  readonly onAddUser: (username: string) => void;
};


export const AddUserFormView: React.FC<AddUserFormProps> = ({ onAddUser }) => {
  const [newUsername, setNewUsername] = useState("");
  return (
    <div className="py-3 d-flex">
      <input
        placeholder="New username..."
        type="text"
        className="form-control"
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
      />

      <button
        style={{ cursor: "pointer" }}
        className="btn btn-primary btn-sm ms-3"
        onClick={() => {
          onAddUser(newUsername);
          setNewUsername("");
        }}
      >
        Add
      </button>
    </div>
  );
};

export const AddUserForm: React.FC = () => {
  const [_, actions] = useListState();

  return <AddUserFormView onAddUser={actions.addUser} />
};
