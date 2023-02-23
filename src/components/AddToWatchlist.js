import { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import { doc, getDoc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { Button, RedButton } from './';
import styled from 'styled-components';

const AddToWatchlist = ({ data: { uid, id, title, poster_path } }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [onWatchlist, setOnWatchlist] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getDoc(doc(db, `users/${uid}/watchlist/${id}`)).then((docSnap) =>
            setOnWatchlist(docSnap.exists())
        );
        setIsLoading(false);
    }, [uid, id]);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            if (!onWatchlist) {
                await setDoc(doc(db, `users/${uid}/watchlist/${id}`), {
                    title,
                    poster_path,
                    timestamp: serverTimestamp(),
                });
                setOnWatchlist(true);
            } else {
                await deleteDoc(doc(db, `users/${uid}/watchlist/${id}`));
                setOnWatchlist(false);
            }
        } catch (error) {
            alert(error.message);
        }
        setIsLoading(false);
    };

    return (
        <Wrapper>
            {!onWatchlist ? (
                <Button onClick={handleClick} disabled={isLoading} $withBorder>
                    <FaPlus /> add to watchlist
                </Button>
            ) : (
                <RedButton onClick={handleClick} disabled={isLoading} $withBorder>
                    <FaTrashAlt /> remove from watchlist
                </RedButton>
            )}
        </Wrapper>
    );
};

export default AddToWatchlist;

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin: 4rem 0;
    button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;
