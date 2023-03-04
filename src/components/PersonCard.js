import { Link } from 'react-router-dom';
import default_poster from '../assets/images/default_poster.jpg';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

const PersonCard = ({ item: { id, name, character, job, profile_path } }) => {
    return (
        <Link to={`/people/${id}`}>
            <Wrapper>
                <img
                    src={
                        profile_path
                            ? `http://image.tmdb.org/t/p/w185${profile_path}`
                            : default_poster
                    }
                    alt={name}
                />
                <h4>{name}</h4>
                <p>{character || job}</p>
            </Wrapper>
        </Link>
    );
};

export default PersonCard;

const Wrapper = styled.article`
    width: 12rem;
    padding: 0.5rem;
    border-radius: var(--radius);
    background-color: var(--clr-light-black);
    color: var(--clr-white);
    text-align: center;
    transition: var(--trans-ease);
    &:hover {
        filter: brightness(150%);
    }
    img {
        width: 10rem;
        height: 10rem;
        margin: 0 auto 0.5rem;
        border-radius: 50%;
        object-fit: cover;
    }
    h4 {
        font-weight: 500;
        letter-spacing: unset;
    }
    p {
        color: var(--clr-gray);
        font-style: italic;
    }
    @media ${breakpoints.sm} {
        width: 10rem;
        img {
            width: 8rem;
            height: 8rem;
        }
    }
`;
