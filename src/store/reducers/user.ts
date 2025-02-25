import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: number;
    users: string;
    isLoading: boolean;
    editMode: boolean;
    error: string;
}

const initialState: UserState = {
    id: 1,
    users: localStorage.getItem('users') || '',
    isLoading: false,
    editMode: false,
    error: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        renameUser: (state, action: PayloadAction<string>) => {
            state.users = action.payload;
        },
        toggleEditMode: (state) => {
            state.editMode = !state.editMode;
        },
    },
});

export const { renameUser, toggleEditMode } = userSlice.actions;
export default userSlice.reducer;
