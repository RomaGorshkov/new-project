import React from 'react';

import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';

import { useAppSelector } from '../../../store/hooks';

import AddUserModal from '../../shared/AddUserModal';

import styles from './Users.module.scss';

const headerColumns: string[] = ['Full Name', 'Department', 'Country', 'Status'];

const Users: React.FC = () => {
    const [open, setOpen] = React.useState<boolean>(false);

    const { users } = useAppSelector((state) => state.userReducer);

    const handleOpen = () => setOpen(!open);

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
                            {users.map((user) => (
                                <TableRow key={user.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.department.name}</TableCell>
                                    <TableCell>{user.country.name}</TableCell>
                                    <TableCell>{user.status.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
};

export default Users;
