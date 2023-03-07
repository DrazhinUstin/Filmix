import { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import reducer from '../reducers/creditReducer';
import { Loader, Error, AltTitle, CreditFilters, MovieList, Pagination } from '../components';

export const initialState = {
    credits: {},
    filters: {
        department: '',
        genre: '',
        sort: '-release_date',
    },
    items: [],
    offset: 0,
    page: 0,
    itemsPerPage: 20,
    pageCount: 0,
};

const PersonCredits = () => {
    const { id } = useParams();
    const { isLoading, error } = useFetch(`person/${id}/movie_credits`, (data) =>
        dispatch({ type: 'SET_CREDITS', payload: data })
    );
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (!state.filters.department) return;
        dispatch({ type: 'FILTER_ITEMS' });
    }, [state.filters]);

    if (isLoading) return <Loader />;

    if (error) return <Error title='failed to fetch credits' err={error} />;

    if (!Object.keys(state.credits).length) return;

    return (
        <section className='section-sm'>
            <AltTitle>credits:</AltTitle>
            <CreditFilters credits={state.credits} filters={state.filters} dispatch={dispatch} />
            <MovieList items={state.items.slice(state.offset, state.offset + state.itemsPerPage)} />
            {!state.items.length && (
                <p className='message'>There are no movies matching these criteria</p>
            )}
            {state.pageCount > 1 && (
                <Pagination
                    pageCount={state.pageCount}
                    handlePageClick={(e) => dispatch({ type: 'SWITCH_PAGE', payload: e.selected })}
                    forcePage={state.page}
                    marginTop='2rem'
                />
            )}
        </section>
    );
};

export default PersonCredits;
