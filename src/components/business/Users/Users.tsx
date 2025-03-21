import React from 'react';
import {
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFormik } from 'formik';

import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import { deleteUser } from '../../../store/reducers/user';
import { useDebounce } from '../../../hooks/useDebounce';

import AddUserModal from '../../shared/AddUserModal/AddUserModal';
import CustomSelect from '../../shared/CustomSelect/CustomSelect';

import { addUserID } from '../../../utils/addUserId';
import { getFilter } from '../../../utils/usersFilter';
import { usersData } from '../../../mockData/mockData';
import { searchFilter } from '../../../utils/searchFilter';
import { IUsers } from '../../../types';

import styles from './Users.module.scss';

const headerColumns: string[] = ['Full Name', 'Department', 'Country', 'Status', ''];

const Users: React.FC = () => {
    const { users } = useAppSelector((state) => state.userReducer);

    const [open, setOpen] = React.useState<boolean>(false);
    const [searchText, setSearchText] = React.useState('');
    const [filteredUsers, setFilteredUsers] = React.useState<IUsers[]>(users);

    const dispatch = useAppDispatch();

    const department = getFilter(usersData, 'department', 'name');
    const country = getFilter(usersData, 'country', 'name');
    const status = getFilter(usersData, 'status', 'name');

    const handleOpen = () => setOpen(!open);

    const handleDelete = async (id: string) => {
        await dispatch(deleteUser(id));
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const debouncedSearchText = useDebounce(searchText, 1000);

    const formik = useFormik({
        initialValues: {
            fullName: '',
            stateDepartment: '',
            stateCountry: '',
            stateStatus: '',
        },
        onSubmit: () => {},
    });

    React.useEffect(() => {
        addUserID(users);
        const filtered = searchFilter(users, {
            ...formik.values,
            fullName: debouncedSearchText,
        });
        setFilteredUsers(filtered);
    }, [formik.values, users, debouncedSearchText]);

    return (
        <Grid className={styles.users}>
            <Grid className={styles.users__header}>U S E R S</Grid>
            <Grid className={styles.users__body}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid className={styles.users__menuFilters}>
                        <Grid className={styles.users__filters}>
                            <TextField
                                sx={{ width: '150px' }}
                                placeholder="Search by name"
                                variant="outlined"
                                name="fullName"
                                value={searchText}
                                onChange={handleSearchChange}
                                onBlur={formik.handleBlur}
                            />
                            <CustomSelect
                                sx={{ width: '125px' }}
                                name="stateDepartment"
                                // id="department-select"
                                label="Department"
                                options={department}
                                formik={formik}
                            />
                            <CustomSelect
                                sx={{ width: '125px' }}
                                name="stateCountry"
                                // id="country-select"
                                label="Country"
                                options={country}
                                formik={formik}
                            />
                            <CustomSelect
                                sx={{ width: '125px' }}
                                name="stateStatus"
                                // id="status-select"
                                label="Status"
                                options={status}
                                formik={formik}
                            />
                            <DeleteIcon
                                className={styles.users__deleteButton}
                                onClick={() => {
                                    formik.resetForm();
                                    setFilteredUsers(users);
                                }}
                            />
                        </Grid>
                        <Grid className={styles.users__addButton}>
                            <Button onClick={handleOpen} variant="outlined" color="primary">
                                Add User
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <AddUserModal open={open} setOpen={setOpen} department={department} country={country} status={status} />
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
                                {filteredUsers.length ? (
                                    filteredUsers.map((user) => (
                                        <TableRow
                                            key={user.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
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
                                            No users found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Users;
