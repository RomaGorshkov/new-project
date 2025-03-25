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
import { useDebounce } from '../../../hooks/useDebounce';
import { deleteUser } from '../../../store/reducers/user';

import AddUserModal from '../../shared/AddUserModal/AddUserModal';
import CustomSelect from '../../shared/CustomSelect/CustomSelect';
import UsersLayout from '../../../layouts/usersLayout';

import { addUserID } from '../../../utils/addUserId';
import { searchFilter } from '../../../utils/searchFilter';
import { IUsers } from '../../../types';
import useUserFilters from '../../../utils/getFilter';

import styles from './Users.module.scss';

const headerColumns: string[] = ['Full Name', 'Department', 'Country', 'Status', ''];

const Users: React.FC = () => {
    const { users } = useAppSelector((state) => state.userReducer);

    const [open, setOpen] = React.useState<boolean>(false);
    const [searchText, setSearchText] = React.useState('');
    const [filteredUsers, setFilteredUsers] = React.useState<IUsers[]>(users);

    const dispatch = useAppDispatch();

    const { department, country, status } = useUserFilters();

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
            selectedUser: '',
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
        <UsersLayout title="U S E R S">
            <form onSubmit={formik.handleSubmit}>
                <Grid className={styles.users__menuFilters}>
                    <Grid className={styles.users__filters} xs={12} xl={2}>
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
                            sx={{ width: '150px' }}
                            name="stateDepartment"
                            label="Department"
                            options={department}
                            formik={formik}
                        />
                        <CustomSelect
                            sx={{ width: '150px' }}
                            name="stateCountry"
                            label="Country"
                            options={country}
                            formik={formik}
                        />
                        <CustomSelect
                            sx={{ width: '150px' }}
                            name="stateStatus"
                            label="Status"
                            options={status}
                            formik={formik}
                        />
                        <DeleteIcon
                            className={styles.users__deleteButton}
                            onClick={() => {
                                formik.resetForm();
                                setFilteredUsers(users);
                                setSearchText('');
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
                                    <TableRow key={user.id}>
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
        </UsersLayout>
    );
};

export default Users;
