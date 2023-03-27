import { useReducer, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import reducer from '../reducers/creditReducer';
import {
    Loader,
    Error,
    Title,
    Selector,
    CrewFilter,
    GridView,
    Pagination,
    Button,
} from '../components';

const initialState = {
    allTypes: [],
    type: '',
    allDepartments: ['All'],
    department: '',
    credits: {},
    items: [],
    paginatedItems: [],
    page: 0,
    pageCount: 0,
    itemsPerPage: 20,
};

const Credits = ({ media_type = 'movie', label = media_type }) => {
    const { id, season_number, episode_number } = useParams();
    const { isLoading, error } = useFetch(
        `/${media_type}/${id}/${season_number ? `season/${season_number}/` : ''}${
            episode_number ? `episode/${episode_number}/` : ''
        }${media_type === 'movie' || episode_number ? 'credits' : 'aggregate_credits'}`,
        (data) => dispatch({ type: 'SETUP_INITIALS', payload: data })
    );
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (!state.type) return;
        dispatch({ type: 'FILTER_ITEMS' });
    }, [state.type, state.department]);

    if (isLoading) return <Loader />;

    if (error) return <Error err={error} link />;

    if (!Object.values(state.credits).flat().length)
        return (
            <Error
                title='credits were not found'
                link={{ title: `back to ${label}`, path: '..' }}
            />
        );

    return (
        <>
            <Title margin='4rem 0'>
                {label} <span>credits</span>
            </Title>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
                <Selector
                    items={state.allTypes.map(
                        ({ name, value }) => `${name} (${state.credits[value].length})`
                    )}
                    callback={(i) => dispatch({ type: 'UPDATE_TYPE', payload: i })}
                />
            </div>
            <div>
                {state.type === 'crew' && <CrewFilter {...state} dispatch={dispatch} />}
                <GridView items={state.paginatedItems} />
                {state.paginatedItems.length === 0 && (
                    <p className='message'>No items to display...</p>
                )}
                {state.pageCount > 1 && (
                    <Pagination
                        pageCount={state.pageCount}
                        handlePageClick={(e) =>
                            dispatch({ type: 'SWITCH_PAGE', payload: e.selected })
                        }
                        forcePage={state.page}
                        marginTop='2rem'
                    />
                )}
            </div>
            <Button as={Link} to='..' margin='4rem 0 0'>
                back to {label}
            </Button>
        </>
    );
};

export default Credits;
