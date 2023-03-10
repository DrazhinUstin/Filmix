import { useTVShowsContext } from '../contexts/TVShowsContext';
import useFetch from '../hooks/useFetch';
import { Loader, Error, Title, TVShowFilters, MovieList, Pagination } from '../components';

const TVShows = () => {
    const {
        filters: { sort, genre, language, year, status, runtime },
        page,
        dispatch,
    } = useTVShowsContext();
    const { isLoading, error, data } = useFetch(
        `/discover/tv?sort_by=${sort}&page=${page}${genre && `&with_genres=${genre}`}${
            language && `&with_original_language=${language}`
        }${year && `&first_air_date_year=${year}`}${status && `&with_status=${status}`}${
            runtime && `&with_runtime.gte=${runtime.gte}&with_runtime.lte=${runtime.lte}`
        }`
    );

    if (error) return <Error err={error} link fullScreen />;

    return (
        <main className='main'>
            <Title>
                TV shows <span>library</span>
            </Title>
            <TVShowFilters isLoading={isLoading} />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {data.results.length ? (
                        <MovieList items={data.results} />
                    ) : (
                        <p className='message'>There are no TV shows matching your search</p>
                    )}
                    {data.total_pages > 1 && (
                        <Pagination
                            pageCount={data.total_pages}
                            handlePageClick={(e) =>
                                dispatch({ type: 'SWITCH_PAGE', payload: e.selected + 1 })
                            }
                            forcePage={page - 1}
                        />
                    )}
                </>
            )}
        </main>
    );
};

export default TVShows;
