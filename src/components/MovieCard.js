import { Link } from 'react-router-dom';
import Button from './Button';
import defaultPoster from '../assets/images/default_poster.jpg';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

const MovieCard = ({ item: { id, title, name, poster_path, media_type } }) => {
    return (
        <Wrapper>
            <img
                src={poster_path ? `https://image.tmdb.org/t/p/w342${poster_path}` : defaultPoster}
                alt={title || name}
            />
            <div className='info'>
                <h4>{title || name}</h4>
                <Button
                    as={Link}
                    to={`/${
                        media_type
                            ? media_type === 'movie'
                                ? 'movies'
                                : 'tv'
                            : title
                            ? 'movies'
                            : 'tv'
                    }/${id}`}
                >
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
    @media ${breakpoints.sm} {
        width: 12rem;
    }
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
