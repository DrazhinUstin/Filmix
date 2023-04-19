import { useState, useEffect } from 'react';
import { collection, getCountFromServer, getDocs, writeBatch } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { Title, GridList, RedButton, Modal } from '../components';
import { toast } from 'react-toastify';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

const WatchlistDetail = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [count, setCount] = useState({ watchlist: 0, ratings: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Promise.allSettled([
            getCountFromServer(collection(db, `users/${auth.currentUser.uid}/watchlist`)),
            getCountFromServer(collection(db, `users/${auth.currentUser.uid}/ratings`)),
        ])
            .then(([val1, val2]) => {
                setCount({
                    watchlist: val1?.value?.data()?.count || 0,
                    ratings: val2?.value?.data()?.count || 0,
                });
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setIsLoading(false));
    }, []);

    const clearCollection = async (name) => {
        setIsLoading(true);
        try {
            const { docs } = await getDocs(collection(db, `users/${auth.currentUser.uid}/${name}`));
            const chunks = [];
            for (let i = 0; i < docs.length; i += 500) {
                chunks.push(docs.slice(i, i + 500));
            }
            chunks.forEach(async (chunk) => {
                const batch = writeBatch(db);
                chunk.forEach((doc) => batch.delete(doc.ref));
                await batch.commit();
            });
            setCount({ ...count, [name]: 0 });
        } catch (error) {
            toast.error(error.message);
        }
        setIsLoading(false);
    };

    return (
        <Wrapper>
            <Title margin='0 0 2rem'>statistic:</Title>
            <GridList fontWeight='normal'>
                {Object.keys(count).map((key) => (
                    <li key={key}>
                        {key[0].toUpperCase() + key.slice(1)}: <span>{count[key]}</span>
                        <RedButton
                            onClick={() => setIsModalOpen({ key })}
                            disabled={isLoading || !count[key]}
                            $withBorder
                        >
                            clear
                        </RedButton>
                    </li>
                ))}
            </GridList>
            {isModalOpen && (
                <Modal
                    title={`Are you sure that you want to clear all your ${isModalOpen.key}?`}
                    closeModal={() => setIsModalOpen(false)}
                    callback={() => clearCollection(isModalOpen.key)}
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
        text-align: left;
        li {
            grid-template-columns: 1fr 8rem 8rem;
            align-items: center;
            span {
                color: var(--clr-green);
                text-align: center;
            }
            @media ${breakpoints.xsm} {
                grid-template-columns: 1fr 4rem 6rem;
            }
        }
    }
`;
