import { internet, random } from "faker";
import {
  Dispatcher,
  UserListEvent,
  UserListEventType,
  UserListState
} from "./types";

export const initialState: UserListState = {
  users: new Array(10).fill(undefined).map(() => ({
    id: random.number(),
    username: internet.userName()
  })),
  editUserId: undefined
};

export const userListReducer = (
  state: UserListState,
  event: UserListEvent
): UserListState => {
  switch (event.type) {
    case UserListEventType.AddUser: {
      return {
        ...state,
        users: [
          ...state.users,
          {
            id: random.number(),
            username: event.username
          }
        ]
      };
    }

    case UserListEventType.RemoveUser: {
      return {
        ...state,
        users: state.users.filter((user) => user.id !== event.userId)
      };
    }

    case UserListEventType.EditUser: {
      return {
        ...state,
        editUserId: event.userId
      };
    }

    case UserListEventType.UpdateUser: {
      return {
        editUserId: undefined,
        users: state.users.map((user) =>
          user.id === event.userId
            ? { ...user, username: event.username }
            : user
        )
      };
    }
    case UserListEventType.CancelEditUser: {
      return {
        ...state,
        editUserId: undefined
      };
    }
  }
};

export const addUser = (dispatch: Dispatcher) => (username: string): void =>
  dispatch({
    type: UserListEventType.AddUser,
    username
  });

export const removeUser = (dispatch: Dispatcher) => (userId: number): void =>
  dispatch({
    type: UserListEventType.RemoveUser,
    userId
  });

export const editUser = (dispatch: Dispatcher) => (userId: number): void =>
  dispatch({
    type: UserListEventType.EditUser,
    userId
  });

export const cancelEditUser = (dispatch: Dispatcher) => (
  userId: number
): void =>
  dispatch({
    type: UserListEventType.CancelEditUser,
    userId
  });

export const updateUser = (dispatch: Dispatcher) => (
  userId: number,
  username: string
): void =>
  dispatch({
    type: UserListEventType.UpdateUser,
    userId,
    username
  });
