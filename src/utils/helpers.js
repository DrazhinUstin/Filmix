export const cutString = (str, maxLength = 150) => {
    if (str.length <= maxLength) return str;
    return `${str.slice(0, maxLength - 3)}...`;
};

export const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(Date.UTC(year, month - 1, day));
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date);
};

export const calcPersonAge = (birthday, deathday) => {
    const date = deathday ? new Date(deathday) : new Date();
    const birthDate = new Date(birthday);
    return Math.floor((date - birthDate) / (365 * 24 * 60 * 60 * 1000));
};

export const formatRuntime = (timeInMin) => {
    const h = Math.floor(timeInMin / 60);
    const m = timeInMin % (h * 60 || 60);
    return `${h}h ${m}m`;
};

export const formatDuration = (timeInSec) => {
    let m = Math.floor(timeInSec / 60);
    let s = timeInSec % 60;
    return `${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
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
        const valueA = typeof a[prop] === 'string' ? a[prop].toUpperCase() : a[prop];
        const valueB = typeof b[prop] === 'string' ? b[prop].toUpperCase() : b[prop];
        const result = valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        return result * order;
    };
};

export const validateFile = (file, maxSize = 1e6) => {
    const fileTypes = [
        'image/apng',
        'image/bmp',
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/svg+xml',
        'image/tiff',
        'image/webp',
        'image/x-icon',
    ];
    if (!fileTypes.includes(file.type)) {
        throw Error(`File type ${file.type} is not a valid file type. Select another file.`);
    }
    if (file.size > maxSize) {
        throw Error(
            `File is too big. The max valid file size is ${(maxSize / 1e6).toFixed(
                1
            )} MB. Select another file.`
        );
    }
    return file;
};
