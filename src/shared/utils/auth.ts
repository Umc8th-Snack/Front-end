export const tokenUtils = {
    setAccessToken: (token: string) => {
        localStorage.setItem('accessToken', token);
    },

    getAccessToken: (): string | null => {
        return localStorage.getItem('accessToken');
    },

    removeAccessToken: () => {
        localStorage.removeItem('accessToken');
    },

    hasAccessToken: (): boolean => {
        return !!localStorage.getItem('accessToken');
    },
};
