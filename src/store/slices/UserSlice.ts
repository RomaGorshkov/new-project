import { createAsyncThunk } from '@reduxjs/toolkit';
import { addUser } from '../reducers/user';

export const getUser = createAsyncThunk<void, string>('getUser', async (data: string, thunkAPI) => {
    thunkAPI.dispatch(addUser(data));
});
