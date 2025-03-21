import * as Yup from 'yup';

import { IValidationUserSchema } from '../types';

export const validationUserSchema: Yup.ObjectSchema<IValidationUserSchema> = Yup.object({
    fullName: Yup.string()
        .matches(/^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']+\s[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']+$/, 'Format: Name Surname (Both capitalized)')
        .required('Full Name is required'),
    stateDepartment: Yup.string().required('Department is required'),
    stateCountry: Yup.string().required('Country is required'),
    stateStatus: Yup.string().required('Status is required'),
    selectedUser: Yup.string().required('User is required'),
});
