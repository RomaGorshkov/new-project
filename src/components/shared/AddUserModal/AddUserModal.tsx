import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Grid, Modal, TextField } from '@mui/material';
import { useFormik } from 'formik';

import { addUser } from '../../../store/reducers/user';
import { validationUserSchema } from '../../../yupSchema/yupSchema';
import CustomSelect from '../CustomSelect/CustomSelect';

import styles from './AddUserModal.module.scss';

interface IAddUserModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    department: string[];
    country: string[];
    status: string[];
}

const AddUserModal: React.FC<IAddUserModalProps> = ({ open, setOpen, department, country, status }) => {
    const [isLoading, setIsLoading] = React.useState(false);

    const dispatch = useDispatch();

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
                    <Grid container xs={6} xl={12}>
                        <Grid className={styles.modal__selected}>
                            <TextField
                                sx={{ minWidth: '250px' }}
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
                                sx={{ minWidth: '250px' }}
                                name="stateDepartment"
                                label="Department"
                                options={department}
                                formik={formik}
                            />
                        </Grid>
                        <Grid className={styles.modal__selected}>
                            <CustomSelect
                                sx={{ minWidth: '250px' }}
                                name="stateCountry"
                                label="Country"
                                options={country}
                                formik={formik}
                            />
                            <CustomSelect
                                sx={{ minWidth: '250px' }}
                                name="stateStatus"
                                label="Status"
                                options={status}
                                formik={formik}
                            />
                        </Grid>
                    </Grid>
                    <Grid className={styles.modal__buttons}>
                        <Button variant="outlined" onClick={() => setOpen(false)}>
                            CANCEL
                        </Button>
                        {isLoading ? (
                            <Button
                                sx={{
                                    backgroundColor: '#d3d3d3',
                                    color: '#808080',
                                    border: '1px solid #b0b0b0',
                                    opacity: 0.7,
                                    cursor: 'not-allowed',
                                }}
                                loading
                                variant="outlined"
                                disabled={isLoading}
                            ></Button>
                        ) : (
                            <Button variant="outlined" color="primary" type="submit">
                                ADD USER
                            </Button>
                        )}
                    </Grid>
                </form>
            </Grid>
        </Modal>
    );
};

export default AddUserModal;
