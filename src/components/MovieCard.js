import { Link } from 'react-router-dom';
import Button from './Button';
import defaultPoster from '../assets/images/default_poster.jpg';
import styled from 'styled-components';

const MovieCard = ({ item }) => {
    const { id, title, poster_path } = item;
    return (
        <Wrapper>
            <img
                src={
                    poster_path
                        ? `https://image.tmdb.org/t/p/original${poster_path}`
                        : defaultPoster
                }
                alt={title}
            />
            <div className='info'>
                <h4>{title}</h4>
                <Button as={Link} to={`/movies/${id}`}>
                    details
                </Button>
            </div>
        </Wrapper>
    );
};

export default MovieCard;

const Wrapper = styled.article`
    position: relative;
    width: 17.5rem;
    flex-shrink: 0;
    img {
        width: 100%;
    }
    .info {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 0.5rem;
        background-color: rgba(var(--clr-rgb-white), 0.9);
        text-align: center;
        visibility: hidden;
        opacity: 0;
        transition: var(--trans-ease);
        h4 {
            margin-bottom: 1rem;
            color: var(--clr-black);
            letter-spacing: unset;
        }
    }
    &:hover .info {
        visibility: visible;
        opacity: 1;
    }
`;
