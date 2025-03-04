import { createSlice } from '@reduxjs/toolkit';

import { IUsers } from '../../types';
import { users } from '../../mockData/mockData';

interface UserState {
    users: IUsers[];
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    users: users,
    isLoading: false,
    error: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
    },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
