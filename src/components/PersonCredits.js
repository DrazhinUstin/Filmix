import { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import reducer from '../reducers/personCreditReducer';
import { Loader, Error, AltTitle, CreditFilters, GridView, Pagination } from '.';

export const initialState = {
    credits: {},
    media_type: '',
    filters: {
        department: '',
        genre: '',
        sort: '',
    },
    items: [],
    offset: 0,
    page: 0,
    itemsPerPage: 20,
    pageCount: 0,
};

const PersonCredits = () => {
    const { id } = useParams();
    const { isLoading, error } = useFetch(`person/${id}/combined_credits`, (data) =>
        dispatch({ type: 'SET_CREDITS', payload: data })
    );
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (!state.media_type) return;
        dispatch({ type: 'FILTER_ITEMS' });
    }, [state.media_type, state.filters]);

    if (isLoading) return <Loader />;

    if (error) return <Error title='failed to fetch credits' err={error} />;

    if (!Object.keys(state.credits).length) return;

    return (
        <section className='section-sm'>
            <AltTitle>credits:</AltTitle>
            <CreditFilters {...state} dispatch={dispatch} />
            <GridView items={state.items.slice(state.offset, state.offset + state.itemsPerPage)} />
            {!state.items.length && (
                <p className='message'>There are no items matching these criteria</p>
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
