export interface IUsers {
    id: string;
    name: string;
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

export interface IValidationUserSchema {
    fullName: string;
    stateDepartment: string;
    stateCountry: string;
    stateStatus: string;
}
