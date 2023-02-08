import { useState, useEffect } from 'react';
import tmdbAPI from '../utils/tmdbAPI';

const useFetch = (url) => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { data } = await tmdbAPI(url);
                setData(data);
                setError(null);
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [url]);

    return { isLoading, error, data };
};

export default useFetch;
