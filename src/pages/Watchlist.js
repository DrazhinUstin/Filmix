import { useState, useEffect } from 'react';
import { query, collection, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Loader, Error, Title, MovieList, Button } from '../components';

const Watchlist = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [watchlist, setWatchlist] = useState([]);
    const [lastItem, setLastItem] = useState(null);
    const itemsPerRequest = 10;

    useEffect(() => {
        const getWatchlist = async () => {
            setIsLoading(true);
            try {
                const q = query(
                    collection(db, `users/${auth.currentUser.uid}/watchlist`),
                    orderBy('timestamp'),
                    limit(itemsPerRequest)
                );
                const querySnapshot = await getDocs(q);
                setWatchlist(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                setLastItem(
                    querySnapshot.size === itemsPerRequest
                        ? querySnapshot.docs[querySnapshot.docs.length - 1]
                        : null
                );
            } catch (error) {
                setError(error);
            }
            setIsLoading(false);
        };
        getWatchlist();
    }, []);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            const q = query(
                collection(db, `users/${auth.currentUser.uid}/watchlist`),
                orderBy('timestamp'),
                startAfter(lastItem),
                limit(itemsPerRequest)
            );
            const querySnapshot = await getDocs(q);
            setWatchlist([
                ...watchlist,
                ...querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
            ]);
            setLastItem(
                querySnapshot.size === itemsPerRequest
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
