import React, { useContext, useState } from 'react';
import { cancelEditUser, addUser as addUser, editUser, initialState, removeUser, updateUser } from './reducer';
import { Dispatcher, UserListState } from './types';

export const UserListContext = React.createContext<[UserListState, Dispatcher]>([initialState, () => undefined]);

export const useListState = () => {
    const [state, dispatch] = useContext(UserListContext)
    const [actions] = useState(() => ({
        addUser: addUser(dispatch),
        removeUser: removeUser(dispatch),
        editUser: editUser(dispatch),
        cancelEditUser: cancelEditUser(dispatch),
        updateUser: updateUser(dispatch)
    }))

    return [state, actions] as const;
}