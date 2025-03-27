import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { FormikProps } from 'formik';

import { IValidationEditUserSchema } from '../../../types';

import { SxProps, Theme } from '@mui/system';

interface ICustomSelectProps {
    sx?: SxProps<Theme>;
    name: keyof IValidationEditUserSchema;
    label: string;
    options: string[];
    formik: FormikProps<IValidationEditUserSchema>;
    disabled?: boolean;
}

const CustomSelect: React.FC<ICustomSelectProps> = ({ sx, name, label, options, formik, disabled }) => {
    return (
        <FormControl required error={formik.touched[name] && Boolean(formik.errors[name])}>
            <InputLabel id={`${name}-label`}>{label}</InputLabel>
            <Select
                sx={sx}
                labelId={`${name}-label`}
                label={label}
                name={name}
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                disabled={disabled}
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
