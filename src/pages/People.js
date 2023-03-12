import { usePeopleContext } from '../contexts/PeopleContext';
import useFetch from '../hooks/useFetch';
import { Loader, Error, Title, PeopleSearch, GridView, Pagination } from '../components';

const People = () => {
    const { query, page, dispatch } = usePeopleContext();
    const { isLoading, error, data } = useFetch(
        query ? `/search/person?query=${query}&page=${page}` : `/person/popular?page=${page}`
    );

    if (error) return <Error err={error} link fullScreen />;

    return (
        <main className='main'>
            <Title>
                people <span>library</span>
            </Title>
            <PeopleSearch />
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    {data.results.length ? (
                        <GridView items={data.results} />
                    ) : (
                        <p className='message'>There are no people matching your search</p>
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

export default People;
