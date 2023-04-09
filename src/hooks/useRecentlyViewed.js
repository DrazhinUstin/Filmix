import { useEffect } from 'react';
import { useGlobalContext } from '../contexts/GlobalContext';

const useRecentlyViewed = (data) => {
    const { recentlyViewed, setRecentlyViewed } = useGlobalContext();

    useEffect(() => {
        if (!data?.id) return;
        setRecentlyViewed((state) => {
            const recent = { ...data, media_type: data.title ? 'movie' : 'tv' };
            return [
                recent,
                ...state.filter(
                    ({ media_type, id }) => media_type !== recent.media_type || id !== recent.id
                ),
            ].slice(0, 20);
        });
    }, [data]); // eslint-disable-line

    return recentlyViewed;
};

export default useRecentlyViewed;
