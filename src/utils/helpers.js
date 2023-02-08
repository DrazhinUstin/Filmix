export const cutString = (str, maxLength = 150) => {
    if (str <= maxLength) return str;
    return `${str.slice(0, maxLength - 3)}...`;
};
