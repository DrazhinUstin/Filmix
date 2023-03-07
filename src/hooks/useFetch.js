import { useState, useEffect } from 'react';
import tmdbAPI from '../utils/tmdbAPI';

const useFetch = (url, callback) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const fetchData = async (path) => {
        setIsLoading(true);
        try {
            const { data } = await tmdbAPI(path);
            callback ? callback(data) : setData(data);
            setError(null);
        } catch (error) {
            setError(error?.response?.data || error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData(url); // eslint-disable-next-line
    }, [url]);

    return { isLoading, error, data, fetchData };
};

export default useFetch;
