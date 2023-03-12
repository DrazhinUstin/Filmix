import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Loader, Error, SearchMenu, Title, GridView, Pagination } from '../components';
import { tmdbSearchOptions } from '../utils/localData';

const Search = () => {
    const { q } = useParams();
    const [type, setType] = useState(tmdbSearchOptions[0].value);
    const [page, setPage] = useState(0);
    const { isLoading, error, data, fetchData } = useFetch(`/search/${type}?query=${q}&page=1`);

    useEffect(() => setPage(0), [type, q]);

    const handlePageClick = (e) => {
        setPage(e.selected);
        fetchData(`/search/${type}?query=${q}&page=${e.selected + 1}`);
    };

    if (error) return <Error title={`failed to fetch ${q}`} err={error} link fullScreen />;

    return (
        <main className='main'>
            <SearchMenu type={type} setType={setType} isLoading={isLoading} />
            <Title>
                {!isLoading && !data.results.length ? 'no' : 'search'} results for <span>{q}</span>
            </Title>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <GridView items={data.results} />
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
