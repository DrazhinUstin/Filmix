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

export const getYears = (startYear = 1900) => {
    const currentYear = +new Date().getFullYear();
    return [...Array(currentYear - startYear + 1)].map((_, i) => currentYear - i);
};

export const dynamicSort = (prop) => {
    let order = 1;
    if (prop[0] === '-') {
        order = -1;
        prop = prop.slice(1);
    }
    return (a, b) => {
        const result = a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0;
        return result * order;
    };
};
