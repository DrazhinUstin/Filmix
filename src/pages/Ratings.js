import { useState, useEffect } from 'react';
import { useRatingsContext } from '../contexts/RatingsContext';
import { collection, query, orderBy, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Loader, Error, Title, RatingFilters, Sort, GridView } from '../components';
import { ratingsOrderOptions as options } from '../utils/localData';

const Ratings = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [ratings, setRatings] = useState([]);
    const { filters, order, dispatch } = useRatingsContext();

    useEffect(() => {
        const getRatings = async () => {
            setIsLoading(true);
            try {
                let q = query(collection(db, `users/${auth.currentUser.uid}/ratings`));
                if (filters.media_type) q = query(q, where('media_type', '==', filters.media_type));
                if (filters.rating) q = query(q, where('rating', '==', +filters.rating));
                if (!(order.includes('rating') && filters.rating)) q = query(q, orderBy(...order));
                const querySnapshot = await getDocs(q);
                setRatings(querySnapshot.docs.map((doc) => doc.data()));
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        };
        getRatings();
    }, [filters, order]);

    if (error) return <Error err={error} link fullScreen />;

    return (
        <main className='main'>
            <Title>
                <span>rated</span> by you
            </Title>
            <RatingFilters filters={filters} dispatch={dispatch} isLoading={isLoading} />
            <Sort
                value={JSON.stringify(order)}
                onChange={(e) =>
                    dispatch({ type: 'UPDATE_ORDER', payload: JSON.parse(e.target.value) })
                }
                isLoading={isLoading}
                options={options.map((opt) => ({ ...opt, value: JSON.stringify(opt.value) }))}
            />
            <GridView items={ratings} />
            {isLoading && <Loader />}
            {!isLoading && !ratings.length && (
                <Error
                    title='items were not found'
                    link={{ path: '/movies', title: 'fill rated' }}
                />
            )}
        </main>
    );
};

export default Ratings;
