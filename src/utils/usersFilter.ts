export const getFilter = <T, K extends keyof T>(array: T[], key: K, subKey: keyof T[K]): string[] => {
    return array
        .map((item) => item[key][subKey] as string) // Дістаємо вкладене значення
        .filter((value, index, self) => self.indexOf(value) === index); // Унікальність
};
