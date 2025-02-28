import React from 'react';

import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';

import { useAppSelector } from '../../../store/hooks';

import './Users.css';

const Users: React.FC = () => {
    const { users } = useAppSelector((state) => state.userReducer);

    const headerColumns: string[] = ['Full Name', 'Department', 'Country', 'Status'];

    return (
        <Grid className="users">
            <Grid className="usersHeader">U S E R S</Grid>
            <Grid className="usersTable">
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
