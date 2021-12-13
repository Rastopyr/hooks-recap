import React, { useReducer } from 'react';
import { AddUserForm } from './05-ContextHook/UserList/Components/AddUserForm';
import { List } from './05-ContextHook/UserList/Components/UserList';
import { UserListContext } from './05-ContextHook/UserList/context';
import { initialState, userListReducer } from './05-ContextHook/UserList/reducer';

const ComplexList = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col col-6 py-3 d-flex">
          <AddUserForm />
        </div>
      </div>

      <div className="row">
        <List />
      </div>
    </div>
  );
};

export const UserListProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(userListReducer, initialState);

  return <UserListContext.Provider value={[state, dispatch]}>{children}</UserListContext.Provider>
}

export const ContextHook: React.FC = () => {
  return <UserListProvider>
    <ComplexList />
  </UserListProvider>;
};
