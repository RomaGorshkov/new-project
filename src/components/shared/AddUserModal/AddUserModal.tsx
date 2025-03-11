import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';

import { usersData } from '../../../mockData/mockData';
import { getFilter } from '../../../utils/usersFilter';
import { addUser } from '../../../store/reducers/user';
import { validationUserSchema } from '../../../yupSchema/yupSchema';
import CustomSelect from '../CustomSelect/CustomSelect';

import styles from './AddUserModal.module.scss';

interface IAddUserModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const AddUserModal: React.FC<IAddUserModalProps> = ({ open, setOpen }) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const dispatch = useDispatch();

    const department = getFilter(usersData, 'department', 'name');
    const country = getFilter(usersData, 'country', 'name');
    const status = getFilter(usersData, 'status', 'name');

    const formik = useFormik({
        initialValues: {
            fullName: '',
            stateDepartment: '',
            stateCountry: '',
            stateStatus: '',
        },
        validationSchema: validationUserSchema,
        onSubmit: (values) => {
            setIsLoading(true);
            setTimeout(() => {
                const newUser = {
                    name: values.fullName,
                    status: { name: values.stateStatus, value: values.stateStatus.toUpperCase() },
                    department: { name: values.stateDepartment, value: values.stateDepartment.toUpperCase() },
                    country: { name: values.stateCountry, value: values.stateCountry.toUpperCase() },
                };
                dispatch(addUser(newUser));
                setOpen(false);
                setIsLoading(false);
                formik.resetForm();
            }, 1500);
        },
    });

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Grid className={styles.modal}>
                <form className={styles.modal__content} onSubmit={formik.handleSubmit}>
                    <Grid className={styles.modal__header}>ADD USER</Grid>
                    <Grid>
                        <Grid className={styles.modal__selected}>
                            <TextField
                                sx={{ minWidth: 250 }}
                                label="Enter Full Name"
                                variant="outlined"
                                name="fullName"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                helperText={formik.touched.fullName && formik.errors.fullName}
                                required
                            />
                            <CustomSelect
                                name="stateDepartment"
                                label="Department"
                                options={department}
                                formik={formik}
                            />
                        </Grid>
                        <Grid className={styles.modal__selected}>
                            <CustomSelect name="stateCountry" label="Country" options={country} formik={formik} />
                            <CustomSelect name="stateStatus" label="Status" options={status} formik={formik} />
                        </Grid>
                    </Grid>
                    <Grid className={styles.modal__buttons}>
                        <Button variant="outlined" onClick={() => setOpen(false)}>
                            CANCEL
                        </Button>
                        <Button variant="outlined" type="submit" disabled={isLoading}>
                            {isLoading ? 'LOADING...' : 'ADD USER'}
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Modal>
    );
};

export default AddUserModal;
