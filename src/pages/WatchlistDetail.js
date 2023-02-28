import { useState, useEffect } from 'react';
import { collection, getCountFromServer, getDocs, writeBatch } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Title, RedButton, Modal } from '../components';
import styled from 'styled-components';

const WatchlistDetail = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getCountFromServer(collection(db, `users/${auth.currentUser.uid}/watchlist`))
            .then((snapshot) => setCount(snapshot.data().count))
            .catch((error) => alert(error.message))
            .finally(() => setIsLoading(false));
    }, []);

    const clearWatchlist = async () => {
        setIsLoading(true);
        try {
            const { docs } = await getDocs(
                collection(db, `users/${auth.currentUser.uid}/watchlist`)
            );
            const chunks = [];
            for (let i = 0; i < docs.length; i += 500) {
                chunks.push(docs.slice(i, i + 500));
            }
            chunks.forEach(async (chunk) => {
                const batch = writeBatch(db);
                chunk.forEach((doc) => batch.delete(doc.ref));
                await batch.commit();
            });
            setCount(0);
        } catch (error) {
            alert(error.message);
        }
        setIsLoading(false);
    };

    return (
        <Wrapper>
            <Title margin='0 0 2rem'>watchlist:</Title>
            <ul>
                <li>
                    total items: <span>{count}</span>
                </li>
            </ul>
            <RedButton
                onClick={() => setIsModalOpen(true)}
                disabled={isLoading || !count}
                $withBorder
            >
                clear watchlist
            </RedButton>
            {isModalOpen && (
                <Modal
                    title='Are you sure that you want to clear your watchlist?'
                    closeModal={() => setIsModalOpen(false)}
                    callback={clearWatchlist}
                />
            )}
        </Wrapper>
    );
};

export default WatchlistDetail;

const Wrapper = styled.article`
    text-align: center;
    ul {
        display: grid;
        justify-content: center;
        gap: 1rem;
        margin: 2rem 0;
        text-align: left;
        li {
            display: grid;
            grid-template-columns: 8rem auto;
            font-size: 1.2rem;
            text-transform: capitalize;
            span {
                text-transform: none;
                color: var(--clr-green);
            }
        }
    }
`;
