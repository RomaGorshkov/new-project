import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { renameUser, toggleEditMode } from '../../../store/slices/UserSlice';

const Users = () => {
    const dispatch = useAppDispatch();
    const { users, editMode } = useAppSelector((state) => state.userReducer);
    const [user, setUser] = useState(users);

    return (
        <div>
            {editMode ? (
                <>
                    <input value={user} onChange={(e) => setUser(e.target.value)} />
                    <button
                        onClick={() => {
                            dispatch(renameUser(user));
                            dispatch(toggleEditMode());
                        }}
                    >
                        Save
                    </button>
                </>
            ) : (
                <>
                    <span>{users}</span>
                    <button onClick={() => dispatch(toggleEditMode())}>Edit</button>
                </>
            )}
        </div>
    );
};

export default Users;
