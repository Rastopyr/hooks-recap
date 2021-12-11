import { internet, random } from "faker";
import React, { useCallback, useMemo, useState } from "react";

const ignoredSymbols = /[abc]/gm;

export const DataMemoization: React.FC = () => {
  const [text, setText] = useState("");

  const cleanText = useMemo(() => {
    return text.replace(ignoredSymbols, "");
  }, [text]);

  const [title, setTitle] = useState("");

  return (
    <div className="container">
      <div className="row">
        <div className="col col-5 py-3">
          <input
            placeholder="Title..."
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        <div className="col col-5">
          <textarea
            style={{ width: 400, height: 150 }}
            value={cleanText}
            onChange={(e) => setText(e.target.value)}
            placeholder="Text without `abc` chars..."
            className="form-control"
          />
        </div>
      </div>
    </div>
  );
};

type User = {
  readonly id: number;
  readonly username: string;
};

type ListProps = {
  readonly users: readonly User[];
  readonly onDelete: (userId: number) => void;
};

type ListItemProps = {
  readonly user: User;
  readonly onDelete: (userId: number) => void;
};

const ListItem: React.FC<ListItemProps> = ({ user, onDelete }) => {
  return (
    <li className="list-group-item">
      <span>{user.username}</span>
      <button
        style={{ cursor: "pointer" }}
        className="btn btn-danger btn-sm ms-2"
        onClick={() => onDelete(user.id)}
      >
        x
      </button>
    </li>
  );
};

const List: React.FC<ListProps> = React.memo(({ users, onDelete }) => {
  return (
    <ul className="list-group">
      {users.map((user) => {
        return <ListItem key={user.id} user={user} onDelete={onDelete} />;
      })}
    </ul>
  );
});

const CallbackMemoization = () => {
  const [users, setUsers] = useState<readonly User[]>(() =>
    new Array(10).fill(undefined).map(() => ({
      id: random.number(),
      username: internet.userName()
    }))
  );

  const onDelete = useCallback(
    (userId: number) => {
      setUsers(users.filter(({ id }) => id !== userId));
    },
    [users]
  );

  const [newUsername, setNewUsername] = useState("");

  const createUser = () => {
    setUsers([...users, { username: newUsername, id: random.number() }]);
    setNewUsername("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col col-6 py-3 d-flex">
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
            onClick={createUser}
          >
            Add
          </button>
        </div>
      </div>

      <div className="row">
        <List users={users} onDelete={onDelete} />
      </div>
    </div>
  );
};

export const MemoizationHook: React.FC = () => {
  return (
    <div className="container fluid">
      <div className="alert">
        <h2>useCallback + useMemo</h2>
      </div>
      <hr />
      <h3>useMemo</h3>
      <DataMemoization />
      <hr />
      <h3>useCallback</h3>
      <CallbackMemoization />
    </div>
  );
};
