export interface IUsers {
    id: string;
    name: string;
    image?: string;
    status: IStatus;
    department: IDepartment;
    country: ICountry;
}

interface IStatus {
    name: string;
    value: string;
}

interface IDepartment {
    name: string;
    value: string;
}

interface ICountry {
    name: string;
    value: string;
}

export interface IValidationBaseUserSchema {
    fullName: string;
    stateDepartment: string;
    stateCountry: string;
    stateStatus: string;
}

export type IValidationAddUserSchema = IValidationBaseUserSchema;

export interface IValidationEditUserSchema extends IValidationBaseUserSchema {
    selectedUser: string;
}
