export type User = {
  readonly id: number;
  readonly username: string;
};

export enum UserListEventType {
  AddUser = "AddUser",
  RemoveUser = "RemvoeUser",
  EditUser = "EditUser",
  CancelEditUser = "CancelEditUser",
  UpdateUser = "UpdateUser"
}

export type AddUserEvent = {
  readonly type: UserListEventType.AddUser;
  readonly username: string;
};

export type RemoveUserEvent = {
  readonly type: UserListEventType.RemoveUser;
  readonly userId: number;
};

export type EditUserEvent = {
  readonly type: UserListEventType.EditUser;
  readonly userId: number;
};

export type CancelEditUserEvent = {
  readonly type: UserListEventType.CancelEditUser;
  readonly userId: number;
};

export type UpdateUserEvent = {
  readonly type: UserListEventType.UpdateUser;
  readonly userId: number;
  readonly username: string;
};

export type UserListEvent =
  | AddUserEvent
  | RemoveUserEvent
  | EditUserEvent
  | UpdateUserEvent
  | CancelEditUserEvent;

export type UserListState = {
  readonly users: readonly User[];
  readonly editUserId: number | undefined;
};

export type Dispatcher = (event: UserListEvent) => void;
