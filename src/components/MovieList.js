import MovieCard from './MovieCard';
import styled from 'styled-components';

const MovieList = ({ items }) => {
    return (
        <Wrapper>
            {items.map((item) => (
                <MovieCard key={item.id} item={item} />
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
`;
