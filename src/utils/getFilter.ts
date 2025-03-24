import { useMemo } from 'react';
import { usersData } from '../mockData/mockData';

const getFilter = <T, K extends keyof T>(array: T[], key: K, subKey: keyof T[K]): string[] => {
    return [...new Set(array.map((item) => item[key][subKey] as string))];
};

const useUserFilters = () => {
    return useMemo(() => {
        return {
            department: getFilter(usersData, 'department', 'name'),
            country: getFilter(usersData, 'country', 'name'),
            status: getFilter(usersData, 'status', 'name'),
        };
    }, [usersData]);
};

export default useUserFilters;
