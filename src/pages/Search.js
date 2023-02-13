import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Loader, Error, Title, MovieList, Pagination } from '../components';

const Search = () => {
    const { q } = useParams();
    const [page, setPage] = useState(0);
    const { isLoading, error, data, fetchData } = useFetch(`/search/movie?query=${q}&page=1`);

    useEffect(() => setPage(0), [q]);

    const handlePageClick = (e) => {
        setPage(e.selected);
        fetchData(`/search/movie?query=${q}&page=${e.selected + 1}`);
    };

    if (error) return <Error title={`failed to fetch ${q}`} err={error} link fullScreen />;

    return (
        <main className='main'>
            <Title>
                {!isLoading && !data.results.length ? 'no' : 'search'} results for <span>{q}</span>
            </Title>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <MovieList items={data.results} />
                    {data.total_pages > 1 && (
                        <Pagination
                            pageCount={data.total_pages}
                            handlePageClick={handlePageClick}
                            forcePage={page}
                        />
                    )}
                </>
            )}
        </main>
    );
};

export default Search;
