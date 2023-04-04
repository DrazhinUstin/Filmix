import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaRegStar } from 'react-icons/fa';
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
import { TextButton, RatingMenu } from '.';
import styled from 'styled-components';

const Rating = ({ data: { uid, id, title, name, poster_path, vote_average, vote_count } }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!uid) return;
        setIsLoading(true);
        getDocs(
            query(
                collection(db, `users/${uid}/ratings`),
                where('id', '==', id),
                where('media_type', '==', title ? 'movie' : 'tv')
            )
        )
            .then(({ docs: [doc] }) =>
                setRating(doc ? { id: doc.id, value: doc.data().rating } : null)
            )
            .finally(() => setIsLoading(false));
    }, [uid, id, title]);

    const addRating = (rating) => {
        setIsLoading(true);
        addDoc(collection(db, `users/${uid}/ratings`), {
            id,
            media_type: title ? 'movie' : 'tv',
            title: title || name,
            poster_path,
            rating,
            timestamp: serverTimestamp(),
        })
            .then((docRef) => setRating({ id: docRef.id, value: rating }))
            .catch((err) => alert(err.message))
            .finally(() => setIsLoading(false));
    };

    const deleteRating = () => {
        setIsLoading(true);
        deleteDoc(doc(db, `users/${uid}/ratings/${rating.id}`))
            .then(() => setRating(null))
            .catch((err) => alert(err.message))
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <Wrapper className='section-sm'>
                <article>
                    <h4>TMDB rating:</h4>
                    <div className='rating'>
                        <FaStar />
                        <p>
                            {vote_average.toFixed(1)}
                            <span>
                                /10 (
                                {vote_count < 1000
                                    ? vote_count
                                    : (vote_count / 1000).toFixed(1) + 'K'}
                                )
                            </span>
                        </p>
                    </div>
                </article>
                <article>
                    <h4>your rating:</h4>
                    <TextButton
                        onClick={() => (uid ? setIsMenuOpen(true) : navigate('/auth'))}
                        disabled={isLoading}
                    >
                        {rating ? (
                            <>
                                <FaStar /> {rating.value.toFixed(1)}
                            </>
                        ) : (
                            <>
                                <FaRegStar />
                                rate
                            </>
                        )}
                    </TextButton>
                </article>
            </Wrapper>
            {isMenuOpen && (
                <RatingMenu
                    isLoading={isLoading}
                    rating={rating?.value}
                    addRating={addRating}
                    deleteRating={deleteRating}
                    closeMenu={() => setIsMenuOpen(false)}
                />
            )}
        </>
    );
};

export default Rating;

const Wrapper = styled.section`
    max-width: max-content;
    display: flex;
    gap: 2rem;
    padding: 0.5rem 1rem;
    border-radius: var(--radius);
    background-color: var(--clr-light-black);
    .rating {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.2rem;
        svg {
            color: var(--clr-red);
            font-size: 1.5rem;
        }
        span {
            color: var(--clr-gray);
            font-size: 0.9rem;
        }
    }
    ${TextButton} {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.2rem;
        svg {
            font-size: 1.5rem;
        }
    }
`;
