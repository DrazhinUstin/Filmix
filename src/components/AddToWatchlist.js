import { useState, useEffect } from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import {
    query,
    collection,
    doc,
    where,
    getDocs,
    addDoc,
    deleteDoc,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';
import { Button, RedButton } from './';
import styled from 'styled-components';

const AddToWatchlist = ({
    data: { uid, id, title, name, genres, release_date, first_air_date, poster_path },
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [docID, setDocID] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        const q = query(
            collection(db, `users/${uid}/watchlist`),
            where('id', '==', id),
            where('media_type', '==', title ? 'movie' : 'tv')
        );
        getDocs(q)
            .then((querySnapshot) => querySnapshot.size && setDocID(querySnapshot.docs[0].id))
            .finally(() => setIsLoading(false));
    }, [uid, id, title]);

    const handleClick = async () => {
        setIsLoading(true);
        try {
            if (!docID) {
                const docRef = await addDoc(collection(db, `users/${uid}/watchlist`), {
                    id,
                    media_type: title ? 'movie' : 'tv',
                    title: title || name,
                    genres: genres.map(({ name }) => name),
                    release_date: release_date || first_air_date,
                    poster_path,
                    timestamp: serverTimestamp(),
                });
                setDocID(docRef.id);
            } else {
                await deleteDoc(doc(db, `users/${uid}/watchlist/${docID}`));
                setDocID(null);
            }
        } catch (error) {
            alert(error.message);
        }
        setIsLoading(false);
    };

    return (
        <Wrapper>
            {!docID ? (
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
