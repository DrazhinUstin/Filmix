import { Rating, ThinRoundedStar } from '@smastrom/react-rating';
import { FaTimes } from 'react-icons/fa';
import { RedButton } from '.';
import styled from 'styled-components';

const myStyles = {
    itemShapes: ThinRoundedStar,
    activeFillColor: '#6bc10f',
    inactiveFillColor: '#d3d3d3',
};

const RatingMenu = ({ isLoading, rating, addRating, deleteRating, closeMenu }) => {
    return (
        <Wrapper>
            <article>
                <button className='close-btn' onClick={closeMenu}>
                    <FaTimes />
                </button>
                <h4>rate this</h4>
                <Rating
                    className='my_rating'
                    itemStyles={myStyles}
                    items={10}
                    value={rating}
                    onChange={addRating}
                    readOnly={!!rating}
                    isDisabled={isLoading}
                    isRequired
                />
                {rating && (
                    <RedButton onClick={deleteRating} disabled={isLoading}>
                        remove rating
                    </RedButton>
                )}
            </article>
        </Wrapper>
    );
};

export default RatingMenu;

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    place-items: center;
    background-color: rgba(var(--clr-rgb-black), 0.6);
    z-index: 999;
    article {
        position: relative;
        max-width: 400px;
        width: 90vw;
        padding: 1rem 0.5rem;
        border-radius: var(--radius);
        background-color: var(--clr-light-black);
        text-align: center;
        h4 {
            margin-bottom: 1rem;
            text-transform: uppercase;
        }
        .close-btn {
            position: absolute;
            top: -0.5rem;
            right: -0.5rem;
            width: 1.5rem;
            height: 1.5rem;
            display: grid;
            place-items: center;
            border: none;
            border-radius: 50%;
            background-color: var(--clr-red);
            color: var(--clr-white);
            font-size: 1rem;
        }
    }
    .my_rating {
        max-width: 100%;
    }
    ${RedButton} {
        width: 10rem;
        margin-top: 1rem;
    }
`;
