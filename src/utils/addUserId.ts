import { nanoid } from '@reduxjs/toolkit';
import { IUsers } from '../types';

export const addUserID = (usersData: IUsers[]) => {
    const usersWithID = usersData.map((user) => ({
        ...user,
        id: nanoid(),
    }));

    localStorage.setItem('users', JSON.stringify(usersWithID));

    return usersWithID;
};
