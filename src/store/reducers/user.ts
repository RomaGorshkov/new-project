import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    reducers: {},
});

export default userSlice.reducer;
