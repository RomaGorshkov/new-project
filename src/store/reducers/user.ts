import { createSlice } from '@reduxjs/toolkit';

import { IUsers } from '../../types';

interface UserState {
    users: IUsers[];
    isLoading: boolean;
    error: string;
}

const initialState: UserState = {
    users: JSON.parse(localStorage.getItem('users') || ''),
    isLoading: false,
    error: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
            localStorage.setItem('users', JSON.stringify(state.users));
        },
        deleteUser(state, action) {
            const index = state.users.findIndex((user) => user.id === action.payload);
            if (index !== -1) {
                state.users.splice(index, 1);
                localStorage.setItem('users', JSON.stringify(state.users));
            }
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex((user) => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
                localStorage.setItem('users', JSON.stringify(state.users));
            }
        },
    },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;

export default userSlice.reducer;
