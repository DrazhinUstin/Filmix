import { useState, useEffect } from 'react';
import { collection, getCountFromServer, getDocs, writeBatch } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Title, GridList, RedButton, Modal } from '../components';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const WatchlistDetail = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getCountFromServer(collection(db, `users/${auth.currentUser.uid}/watchlist`))
            .then((snapshot) => setCount(snapshot.data().count))
            .catch((error) => toast.error(error.message))
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
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    return (
        <Wrapper>
            <Title margin='0 0 2rem'>watchlist:</Title>
            <GridList fontWeight='normal'>
                <li>
                    Total items: <span>{count}</span>
                </li>
            </GridList>
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
    ${GridList} {
        justify-content: center;
        margin: 2rem 0;
        text-align: left;
        li {
            grid-template-columns: 8rem auto;
            span {
                color: var(--clr-green);
            }
        }
    }
`;
