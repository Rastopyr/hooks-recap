import React, { useReducer } from "react";
import { AddUserForm } from "./04-ReducerHook/UserList/Components/AddUserForm";
import { List } from "./04-ReducerHook/UserList/Components/UserList";
import {
  removeUser,
  cancelEditUser,
  createUser,
  editUser,
  initialState,
  updateUser,
  userListReducer
} from "./04-ReducerHook/UserList/reducer";

enum EventType {
  Increment = "Increment",
  Decrement = "Decrement"
}

type Event = {
  readonly type: EventType;
};

function assertInvalidValue(value: never): never {
  throw new Error(`Invalid value: ${JSON.stringify(value)}`);
}

const increment = (dispatch: (event: Event) => void) => () =>
  dispatch({
    type: EventType.Increment
  });

const decrement = (dispatch: (event: Event) => void) => () =>
  dispatch({
    type: EventType.Decrement
  });

const reduceCounter = (state: number, event: Event): number => {
  switch (event.type) {
    case EventType.Decrement: {
      const nextValue = state - 1;

      if (nextValue < 0) {
        return state;
      }

      return nextValue;
    }
    case EventType.Increment: {
      return state + 1;
    }
    default:
      return assertInvalidValue(event.type);
  }
};

type CounterProps = {
  readonly onIncrement: () => void;
  readonly onDecrement: () => void;
  readonly value: number;
};

const Counter: React.FC<CounterProps> = ({
  onIncrement,
  onDecrement,
  value
}) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col col-2 d-flex flex-column align-items-center">
          <div>
            <h1>
              <div className="badge bg-warning">{value}</div>
            </h1>
          </div>
          <div className="d-flex">
            <button className="btn btn-primary m-1" onClick={onIncrement}>
              +
            </button>

            <button className="btn btn-primary m-1" onClick={onDecrement}>
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CounterWithReducer: React.FC = () => {
  const [counter, dispatch] = useReducer(reduceCounter, 0);

  return (
    <Counter
      onIncrement={increment(dispatch)}
      onDecrement={decrement(dispatch)}
      value={counter}
    />
  );
};

const ComplexReducer = () => {
  const [state, dispatch] = useReducer(userListReducer, initialState);

  return (
    <div className="container">
      <div className="row">
        <div className="col col-6 py-3 d-flex">
          <AddUserForm onCreate={createUser(dispatch)} />
        </div>
      </div>

      <div className="row">
        <List
          users={state.users}
          onDelete={removeUser(dispatch)}
          onCancelEdit={cancelEditUser(dispatch)}
          onEdit={editUser(dispatch)}
          onSave={updateUser(dispatch)}
          editUserId={state.editUserId}
        />
      </div>
    </div>
  );
};

export const ReducerHook: React.FC = () => {
  return (
    <div className="container fluid">
      <div className="alert">
        <h2>useReducer</h2>
      </div>
      <hr />
      <h3>Simple counter with reducer</h3>
      <CounterWithReducer />
      <hr />
      <h3>Complex state and logic</h3>
      <ComplexReducer />
    </div>
  );
};
