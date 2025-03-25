import * as Yup from 'yup';

import { IValidationAddUserSchema, IValidationEditUserSchema } from '../types';

export const validationAddUserSchema: Yup.ObjectSchema<IValidationAddUserSchema> = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    stateDepartment: Yup.string().required('Department is required'),
    stateCountry: Yup.string().required('Country is required'),
    stateStatus: Yup.string().required('Status is required'),
});

export const validationEditUserSchema: Yup.ObjectSchema<IValidationEditUserSchema> = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    stateDepartment: Yup.string().required('Department is required'),
    stateCountry: Yup.string().required('Country is required'),
    stateStatus: Yup.string().required('Status is required'),
    selectedUser: Yup.string().required('User is required'),
});
