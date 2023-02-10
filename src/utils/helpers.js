export const cutString = (str, maxLength = 150) => {
    if (str <= maxLength) return str;
    return `${str.slice(0, maxLength - 3)}...`;
};

export const formatRuntime = (timeInMin) => {
    const h = Math.floor(timeInMin / 60);
    const m = timeInMin % (h * 60 || 60);
    return `${h}h ${m}m`;
};

export const formatToCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(amount);
};
