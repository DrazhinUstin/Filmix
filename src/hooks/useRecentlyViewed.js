import { useEffect } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';

const useRecentlyViewed = (data) => {
    const { recentlyViewed, dispatch } = useGlobalContext();

    useEffect(() => {
        if (!data?.id) return;
        dispatch({ type: 'UPDATE_RECENTLY_VIEWED', payload: data });
    }, [data]); // eslint-disable-line

    return recentlyViewed;
};

export default useRecentlyViewed;
