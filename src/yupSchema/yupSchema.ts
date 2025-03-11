import * as Yup from 'yup';

interface IValidationUserSchema {
    fullName: string;
    stateDepartment: string;
    stateCountry: string;
    stateStatus: string;
}

export const validationUserSchema: Yup.ObjectSchema<IValidationUserSchema> = Yup.object({
    fullName: Yup.string()
        .matches(/^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']+\s[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']+$/, 'Format: Name Surname (Both capitalized)')
        .required('Full Name is required'),
    stateDepartment: Yup.string().required('Department is required'),
    stateCountry: Yup.string().required('Country is required'),
    stateStatus: Yup.string().required('Status is required'),
});
