import { useMoviesContext } from '../contexts/MoviesContext';
import useFetch from '../hooks/useFetch';
import { Loader, Error, Title, MovieFilters, Sort, GridView, Pagination } from '../components';
import { tmdbSortOptions } from '../utils/localData';

const Movies = () => {
    const {
        page,
        sort,
        filters: { genre, year, language, runtime, certification },
        dispatch,
    } = useMoviesContext();
    const { isLoading, error, data } = useFetch(
        `/discover/movie?page=${page + 1}&sort_by=${sort}${genre && `&with_genres=${genre}`}${
            year && `&primary_release_year=${year}`
        }${language && `&with_original_language=${language}`}${
            runtime && `&with_runtime.gte=${runtime.gte}&with_runtime.lte=${runtime.lte}`
        }${certification && `&certification_country=US&certification=${certification}`}`
    );

    if (error) return <Error err={error} link fullScreen />;

    return (
        <main className='main'>
            <Title>
                movie <span>library</span>
            </Title>
            <MovieFilters isLoading={isLoading} />
            <Sort
                value={sort}
                onChange={(e) => dispatch({ type: 'UPDATE_SORT', payload: e.target.value })}
                isLoading={isLoading}
                options={tmdbSortOptions}
            />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {data.results.length ? (
                        <GridView items={data.results} />
                    ) : (
                        <p className='message'>No movies found for your search</p>
                    )}
                    {data.total_pages > 1 && (
                        <Pagination
                            pageCount={data.total_pages}
                            handlePageClick={(e) =>
                                dispatch({ type: 'SWITCH_PAGE', payload: e.selected })
                            }
                            forcePage={page}
                        />
                    )}
                </>
            )}
        </main>
    );
};

export default Movies;
