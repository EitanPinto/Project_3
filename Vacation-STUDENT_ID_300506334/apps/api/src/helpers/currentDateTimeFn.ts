
export const toLocal = (date: Date): string => {
    const local: Date = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON();
};
