import { useReducer, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import reducer from '../reducers/videosReducer';
import {
    Loader,
    Error,
    Title,
    VideoFilters,
    Sort,
    VideoCard,
    Pagination,
    Button,
} from '../components';
import { sortOptions } from '../utils/localData';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

export const initialState = {
    allTypes: ['All'],
    allSizes: ['All'],
    allSites: ['All'],
    filters: {
        type: '',
        size: '',
        site: '',
    },
    sort: sortOptions.videos[0].value,
    data: [],
    items: [],
    paginatedItems: [],
    itemsPerPage: 10,
    page: 0,
    pageCount: 0,
};

const Videos = ({ media_type = 'movie', label = media_type }) => {
    const { id, season_number, episode_number } = useParams();
    const { isLoading, error } = useFetch(
        `${media_type}/${id}${season_number ? `/season/${season_number}` : ''}${
            episode_number ? `/episode/${episode_number}` : ''
        }/videos`,
        (data) => dispatch({ type: 'SET_INITIAL', payload: data.results })
    );
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (!state.data.length) return;
        dispatch({ type: 'SORT_DATA' });
        dispatch({ type: 'FILTER_ITEMS' });
    }, [state.data, state.filters, state.sort]);

    if (isLoading) return <Loader />;

    if (error) return <Error err={error} link />;

    if (!state.data.length)
        return (
            <Error title='videos were not found' link={{ title: `back to ${label}`, path: '..' }} />
        );

    return (
        <>
            <Title margin='4rem 0'>
                all <span>videos</span>
            </Title>
            <VideoFilters {...state} dispatch={dispatch} />
            <Sort
                value={state.sort}
                onChange={(e) => dispatch({ type: 'UPDATE_SORT', payload: e.target.value })}
                options={sortOptions.videos}
            />
            <Wrapper>
                {state.paginatedItems.map((item, index) => (
                    <VideoCard key={index} item={item} />
                ))}
            </Wrapper>
            {state.paginatedItems.length === 0 && (
                <p className='message'>There are no videos matching your search...</p>
            )}
            {state.pageCount > 1 && (
                <Pagination
                    pageCount={state.pageCount}
                    handlePageClick={(e) => dispatch({ type: 'SWITCH_PAGE', payload: e.selected })}
                    forcePage={state.page}
                />
            )}
            <Button margin='4rem 0 0' as={Link} to='..'>
                back to {label}
            </Button>
        </>
    );
};

export default Videos;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
    gap: 2rem;
    @media ${breakpoints.sm} {
        grid-template-columns: unset;
    }
`;
