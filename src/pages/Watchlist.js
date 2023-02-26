import { useState, useEffect } from 'react';
import { query, collection, where, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useWatchlistContext } from '../contexts/WatchlistContext';
import { Loader, Error, Title, WatchlistFilters, MovieList, Button } from '../components';

const Watchlist = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const [lastItem, setLastItem] = useState(null);
    const {
        filters: { genre, order, limit: reqLimit },
    } = useWatchlistContext();

    useEffect(() => {
        const getWatchlist = async () => {
            setIsLoading(true);
            try {
                let q = query(
                    collection(db, `users/${auth.currentUser.uid}/watchlist`),
                    orderBy(...order),
                    limit(reqLimit)
                );
                if (genre) q = query(q, where('genres', 'array-contains', genre));
                const querySnapshot = await getDocs(q);
                setWatchlist(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                setLastItem(
                    querySnapshot.size === reqLimit
                        ? querySnapshot.docs[querySnapshot.docs.length - 1]
                        : null
                );
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        };
        getWatchlist();
    }, [genre, order, reqLimit]);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            let q = query(
                collection(db, `users/${auth.currentUser.uid}/watchlist`),
                orderBy(...order),
                startAfter(lastItem),
                limit(reqLimit)
            );
            if (genre) q = query(q, where('genres', 'array-contains', genre));
            const querySnapshot = await getDocs(q);
            setWatchlist([
                ...watchlist,
                ...querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
            ]);
            setLastItem(
                querySnapshot.size === reqLimit
                    ? querySnapshot.docs[querySnapshot.docs.length - 1]
                    : null
            );
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    if (error) return <Error err={error} link fullScreen />;

    return (
        <main className='main'>
            <Title>
                your <span>watchlist</span>
            </Title>
            <WatchlistFilters isLoading={isLoading} />
            <MovieList items={watchlist} />
            {lastItem && (
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <Button onClick={handleClick} disabled={isLoading}>
                        load more
                    </Button>
                </div>
            )}
            {isLoading && <Loader />}
            {!isLoading && !watchlist.length && (
                <Error
                    title='no items were found'
                    link={{ title: 'fill watchlist', path: '/movies' }}
                />
            )}
        </main>
    );
};

export default Watchlist;
