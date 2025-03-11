import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FormikProps } from 'formik';

import { IValidationUserSchema } from '../../../types';

interface ICustomSelectProps {
    name: keyof IValidationUserSchema;
    label: string;
    options: string[];
    formik: FormikProps<IValidationUserSchema>;
}

const CustomSelect: React.FC<ICustomSelectProps> = ({ name, label, options, formik }) => {
    return (
        <FormControl sx={{ minWidth: 250 }} required error={formik.touched[name] && Boolean(formik.errors[name])}>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                labelId={`${name}-label`}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            >
                {options.map((option, index) => (
                    <MenuItem key={index} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;
