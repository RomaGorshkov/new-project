import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';

import { useAppDispatch, useAppSelector } from '../../../store/storeHooks';
import useUserFilters from '../../../utils/getFilter';

import CustomSelect from '../../shared/CustomSelect/CustomSelect';
import { updateUser } from '../../../store/reducers/user';
import UsersLayout from '../../../layouts/usersLayout';

import styles from './UsersEdit.module.scss';

const UsersEdit: React.FC = () => {
    const [editMode, setEditMode] = React.useState(false);

    const { users } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();

    const userOptions = users.map((user) => user.name);

    const { department, country, status } = useUserFilters();

    const formik = useFormik({
        initialValues: {
            fullName: '',
            stateDepartment: '',
            stateCountry: '',
            stateStatus: '',
            selectedUser: '',
        },
        onSubmit: (values) => {
            const user = users.find((u) => u.name === values.selectedUser);
            if (user) {
                const updatedUser = {
                    name: values.fullName,
                    status: { name: values.stateStatus, value: values.stateStatus.toUpperCase() },
                    department: { name: values.stateDepartment, value: values.stateDepartment.toUpperCase() },
                    country: { name: values.stateCountry, value: values.stateCountry.toUpperCase() },
                };
                dispatch(updateUser({ ...user, ...updatedUser }));
                formik.resetForm({ values: { ...formik.initialValues, selectedUser: '' } });
                setEditMode(false);
            }
        },
    });

    React.useEffect(() => {
        if (formik.values.selectedUser) {
            const user = users.find((u) => u.name === formik.values.selectedUser);
            if (user) {
                const newValues = {
                    fullName: user.name,
                    stateDepartment: user.department?.name || '',
                    stateCountry: user.country?.name || '',
                    stateStatus: user.status?.name || '',
                };
                formik.resetForm({
                    values: { selectedUser: user.name, ...newValues },
                });
                setEditMode(true);
            }
        }
    }, [formik.values.selectedUser]);

    return (
        <UsersLayout title="EDIT USER">
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <CustomSelect
                            sx={{ width: '250px' }}
                            name="selectedUser"
                            label="User"
                            options={userOptions}
                            formik={formik}
                        />
                    </Grid>
                    {editMode && (
                        <>
                            <Grid item xs={12} className={styles.usersEdit__sectionTitle}>
                                User Information
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    sx={{ width: '250px' }}
                                    label="Full Name"
                                    name="fullName"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomSelect
                                    sx={{ width: '250px' }}
                                    name="stateDepartment"
                                    label="Department"
                                    options={department}
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomSelect
                                    sx={{ width: '250px' }}
                                    name="stateCountry"
                                    label="Country"
                                    options={country}
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <CustomSelect
                                    sx={{ width: '250px' }}
                                    name="stateStatus"
                                    label="Status"
                                    options={status}
                                    formik={formik}
                                />
                            </Grid>
                            <Grid item xs={12} className={styles.usersEdit__buttons}>
                                <Button
                                    variant="outlined"
                                    className={styles.usersEdit__undo}
                                    onClick={() => {
                                        formik.resetForm({ values: { ...formik.initialValues, selectedUser: '' } });
                                        setEditMode(false);
                                    }}
                                >
                                    Undo
                                </Button>
                                <Button
                                    variant="contained"
                                    className={styles.usersEdit__save}
                                    disabled={!formik.dirty || !formik.isValid}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            </form>
        </UsersLayout>
    );
};

export default UsersEdit;
