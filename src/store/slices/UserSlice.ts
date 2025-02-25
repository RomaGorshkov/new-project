import { createAsyncThunk } from '@reduxjs/toolkit';
import { renameUser } from '../reducers/user';

export const getUser = createAsyncThunk<void, string>('getUser', async (data: string, thunkAPI) => {
    thunkAPI.dispatch(renameUser(data));
});
