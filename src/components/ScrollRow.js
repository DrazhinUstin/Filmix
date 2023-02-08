import useFetch from '../hooks/useFetch';
import { Loader, Title, MovieCard } from './';
import styled from 'styled-components';

const ScrollRow = ({ title, url }) => {
    const { isLoading, data } = useFetch(url);

    if (isLoading) return <Loader />;

    return (
        <section className='section section-center'>
            {title && <Title>{title}</Title>}
            <Wrapper>
                {data?.results?.map((item) => {
                    return <MovieCard key={item.id} item={item} />;
                })}
            </Wrapper>
        </section>
    );
};

export default ScrollRow;

const Wrapper = styled.div`
    display: flex;
    gap: 1rem;
    overflow-x: auto;
`;
