import React from 'react';

import { Button, Grid, MenuItem, Modal, Select, TextField } from '@mui/material';

import styles from './AddUserModal.module.scss';

import { useAppSelector } from '../../store/hooks';

interface IAddUserModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const AddUserModal: React.FC<IAddUserModalProps> = ({ open, setOpen }) => {
    const { users } = useAppSelector((state) => state.userReducer);

    return (
        <Modal open={open}>
            <Grid className={styles.modal}>
                <Grid className={styles.modal__content}>
                    <Grid className={styles.modal__header}>ADD USER</Grid>
                    <Grid className={styles.modal__selected}>
                        <TextField label="Enter Full Name" variant="outlined" />
                        <Select variant="outlined" value="department">
                            <MenuItem value="department">Department</MenuItem>
                        </Select>
                    </Grid>
                    <Grid className={styles.modal__buttons}>
                        <Button variant="outlined" onClick={() => setOpen(false)}>
                            CANCEL
                        </Button>
                        <Button variant="outlined" onClick={() => setOpen(false)}>
                            ADD USER
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default AddUserModal;
