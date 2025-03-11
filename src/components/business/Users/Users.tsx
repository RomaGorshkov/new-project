import React from 'react';

import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { deleteUser } from '../../../store/reducers/user';

import AddUserModal from '../../shared/AddUserModal/AddUserModal';

import { addUserID } from '../../../utils/addUserId';

import styles from './Users.module.scss';

const headerColumns: string[] = ['Full Name', 'Department', 'Country', 'Status', ''];

const Users: React.FC = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    const { users } = useAppSelector((state) => state.userReducer);

    React.useEffect(() => {
        addUserID(users);
    }, [users]);

    const handleOpen = () => setOpen(!open);

    const handleDelete = async (id: string) => {
        await dispatch(deleteUser(id));
    };

    return (
        <Grid className={styles.users}>
            <Grid className={styles.users__header}>U S E R S</Grid>
            <Grid className={styles.users__addButton}>
                <Button onClick={handleOpen} variant="outlined" color="primary">
                    Add User
                </Button>
                <AddUserModal open={open} setOpen={setOpen} />
            </Grid>
            <Grid className={styles.users__table}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            {headerColumns.map((item) => (
                                <TableCell key={item} sx={{ fontWeight: 'bold' }}>
                                    {item}
                                </TableCell>
                            ))}
                        </TableHead>
                        <TableBody>
                            {users.length ? (
                                users.map((user) => (
                                    <TableRow key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.department.name}</TableCell>
                                        <TableCell>{user.country.name}</TableCell>
                                        <TableCell>{user.status.name}</TableCell>
                                        <TableCell>
                                            <DeleteIcon
                                                onClick={() => handleDelete(user.id)}
                                                className={styles.users__deleteButton}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={headerColumns.length} sx={{ textAlign: 'center', py: 2 }}>
                                        Please add users
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default Users;
