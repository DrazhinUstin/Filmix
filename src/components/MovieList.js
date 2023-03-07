import MovieCard from './MovieCard';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

const MovieList = ({ items }) => {
    return (
        <Wrapper>
            {items.map((item, index) => (
                <MovieCard key={index} item={item} />
            ))}
        </Wrapper>
    );
};

export default MovieList;

const Wrapper = styled.section`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    align-items: flex-start;
    gap: 2rem;
    & > article {
        width: 100%;
    }
    @media ${breakpoints.sm} {
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
        gap: 1rem;
    }
`;
