import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material';

import { usersData } from '../../mockData/mockData';
import { getFilter } from '../../utils/usersFilter';
import { addUser } from '../../store/reducers/user';

import styles from './AddUserModal.module.scss';

interface IAddUserModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
}

const AddUserModal: React.FC<IAddUserModalProps> = ({ open, setOpen }) => {
    const dispatch = useDispatch();

    const [fullName, setFullName] = useState('');
    const [stateDepartment, setStateDepartment] = useState('');
    const [stateCountry, setStateCountry] = useState('');
    const [stateStatus, setStateStatus] = useState('');

    const department = getFilter(usersData, 'department', 'name');
    const country = getFilter(usersData, 'country', 'name');
    const status = getFilter(usersData, 'status', 'name');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!fullName || !stateDepartment || !stateCountry || !stateStatus) return;

        const newUser = {
            name: fullName,
            status: { name: stateStatus, value: stateStatus.toUpperCase() },
            department: { name: stateDepartment, value: stateDepartment.toUpperCase() },
            country: { name: stateCountry, value: stateCountry.toUpperCase() },
        };

        dispatch(addUser(newUser));
        setOpen(false);
        setFullName('');
        setStateDepartment('');
        setStateCountry('');
        setStateStatus('');
    };

    return (
        <Modal open={open} onClose={() => setOpen(false)}>
            <Grid className={styles.modal}>
                <form className={styles.modal__content} onSubmit={handleSubmit}>
                    <Grid className={styles.modal__header}>ADD USER</Grid>
                    <Grid>
                        <Grid className={styles.modal__selected}>
                            <TextField
                                sx={{ minWidth: 250 }}
                                label="Enter Full Name"
                                variant="outlined"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                            <FormControl sx={{ minWidth: 250 }} required>
                                <InputLabel id="department-label">Department</InputLabel>
                                <Select
                                    variant="outlined"
                                    labelId="department-label"
                                    value={stateDepartment}
                                    onChange={(e) => setStateDepartment(e.target.value)}
                                >
                                    {department.map((dep, index) => (
                                        <MenuItem key={index} value={dep}>
                                            {dep}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid className={styles.modal__selected}>
                            <FormControl sx={{ minWidth: 250 }} required>
                                <InputLabel id="country-label">Country</InputLabel>
                                <Select
                                    labelId="country-label"
                                    value={stateCountry}
                                    onChange={(e) => setStateCountry(e.target.value)}
                                >
                                    {country.map((ctry, index) => (
                                        <MenuItem key={index} value={ctry}>
                                            {ctry}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 250 }} required>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    labelId="status-label"
                                    value={stateStatus}
                                    onChange={(e) => setStateStatus(e.target.value)}
                                >
                                    {status.map((stat, index) => (
                                        <MenuItem key={index} value={stat}>
                                            {stat}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid className={styles.modal__buttons}>
                        <Button variant="outlined" onClick={() => setOpen(false)}>
                            CANCEL
                        </Button>
                        <Button variant="outlined" type="submit">
                            ADD USER
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Modal>
    );
};

export default AddUserModal;
