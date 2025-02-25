import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { toggleEditMode } from '../../../store/reducers/user';
import { getUser } from '../../../store/slices/UserSlice';

const Users = () => {
    const dispatch = useAppDispatch();
    const { users, editMode } = useAppSelector((state) => state.userReducer);
    const [user, setUser] = useState(users);

    const changeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    };

    const changeEditMode = () => {
        dispatch(getUser(user));
        dispatch(toggleEditMode());
    };

    return (
        <div>
            {editMode ? (
                <>
                    <input value={user} onChange={(e) => changeUser(e)} />
                    <button
                        onClick={() => {
                            changeEditMode();
                        }}
                    >
                        Save
                    </button>
                </>
            ) : (
                <>
                    <span>{users}</span>
                    <button onClick={() => changeEditMode()}>Edit</button>
                </>
            )}
        </div>
    );
};

export default Users;
