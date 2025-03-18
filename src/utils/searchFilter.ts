import { IUsers } from '../types';

export const searchFilter = (
    users: IUsers[],
    filters?: { fullName: string; stateDepartment: string; stateCountry: string; stateStatus: string }
) => {
    return users.filter((user) => {
        return (
            (!filters?.fullName || user.name.toLowerCase().includes(filters.fullName.toLowerCase())) &&
            (!filters?.stateDepartment || user.department.name === filters.stateDepartment) &&
            (!filters?.stateCountry || user.country.name === filters.stateCountry) &&
            (!filters?.stateStatus || user.status.name === filters.stateStatus)
        );
    });
};
