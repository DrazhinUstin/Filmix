import { useState, useEffect } from 'react';
import { query, collection, where, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Loader, Error, Title, WatchlistFilters, MovieList, Button } from '../components';

const Watchlist = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const [lastItem, setLastItem] = useState(null);
    const [filters, setFilters] = useState({
        genre: '',
        order: ['timestamp', 'desc'],
        limit: 10,
    });

    useEffect(() => {
        const getWatchlist = async () => {
            setIsLoading(true);
            try {
                const coll = collection(db, `users/${auth.currentUser.uid}/watchlist`);
                const q = filters.genre
                    ? query(
                          coll,
                          where('genres', 'array-contains', filters.genre),
                          orderBy(...filters.order),
                          limit(filters.limit)
                      )
                    : query(coll, orderBy(...filters.order), limit(filters.limit));
                const querySnapshot = await getDocs(q);
                setWatchlist(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                setLastItem(
                    querySnapshot.size === filters.limit
                        ? querySnapshot.docs[querySnapshot.docs.length - 1]
                        : null
                );
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        };
        getWatchlist();
    }, [filters]);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const coll = collection(db, `users/${auth.currentUser.uid}/watchlist`);
            const q = filters.genre
                ? query(
                      coll,
                      where('genres', 'array-contains', filters.genre),
                      orderBy(...filters.order),
                      startAfter(lastItem),
                      limit(filters.limit)
                  )
                : query(
                      coll,
                      orderBy(...filters.order),
                      startAfter(lastItem),
                      limit(filters.limit)
                  );
            const querySnapshot = await getDocs(q);
            setWatchlist([
                ...watchlist,
                ...querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
            ]);
            setLastItem(
                querySnapshot.size === filters.limit
                    ? querySnapshot.docs[querySnapshot.docs.length - 1]
                    : null
            );
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    if (error) return <Error err={error} link fullScreen />;

    if (!isLoading && !watchlist.length)
        return (
            <Error
                title='your watchlist is empty'
                link={{ title: 'fill it now', path: '/movies' }}
                fullScreen
            />
        );

    return (
        <main className='main'>
            <Title>
                your <span>watchlist</span>
            </Title>
            <WatchlistFilters isLoading={isLoading} filters={filters} setFilters={setFilters} />
            <MovieList items={watchlist} />
            {lastItem && (
                <div style={{ textAlign: 'center', marginTop: '4rem' }}>
                    <Button onClick={handleClick} disabled={isLoading}>
                        load more
                    </Button>
                </div>
            )}
            {isLoading && <Loader />}
        </main>
    );
};

export default Watchlist;
