const setTokenLS = (token: string): void => {
    if (!token) return;
    localStorage.setItem("token", token);
    return;
};

const clearTokenLS = (): void => {
    localStorage.removeItem("token");
    return;
};

const getTokenLS = (): string | null => {
    const tokenLs = localStorage.getItem("token");
    return tokenLs;
};

export {
    setTokenLS,
    clearTokenLS,
    getTokenLS
};