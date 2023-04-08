import { useState, useEffect } from 'react';
import tmdbAPI from '../utils/tmdbAPI';
import { FormField, RedButton } from './';
import styled from 'styled-components';

const CreditFilters = ({ credits, media_type, filters, dispatch }) => {
    const [movieGenres, setMovieGenres] = useState([]);
    const [tvGenres, setTVGenres] = useState([]);

    useEffect(() => {
        Promise.allSettled([tmdbAPI('/genre/movie/list'), tmdbAPI('/genre/tv/list')]).then(
            ([val1, val2]) => {
                setMovieGenres(val1?.value?.data?.genres || []);
                setTVGenres(val2?.value?.data?.genres || []);
            }
        );
    }, []);

    const handleFilters = (e) =>
        dispatch({
            type: 'UPDATE_FILTERS',
            payload: { name: e.target.name, value: e.target.value },
        });

    return (
        <Wrapper onSubmit={(e) => e.preventDefault()}>
            <FormField
                name='type'
                value={media_type}
                onChange={(e) => dispatch({ type: 'SWITCH_MEDIA_TYPE', payload: e.target.value })}
            >
                {Object.keys(credits).map((item, index) => (
                    <option key={index} value={item}>
                        {item === 'tv' ? item.toUpperCase() : item[0].toUpperCase() + item.slice(1)}{' '}
                        ({Object.values(credits[item]).flat().length})
                    </option>
                ))}
            </FormField>
            <FormField name='department' value={filters.department} onChange={handleFilters}>
                {Object.keys(credits[media_type]).map((key) => (
                    <option
                        key={key}
                        value={key}
                    >{`${key} (${credits[media_type][key].length})`}</option>
                ))}
            </FormField>
            <FormField name='genre' value={filters.genre} onChange={handleFilters}>
                {['All', ...(media_type === 'movie' ? movieGenres : tvGenres)].map(
                    (item, index) => (
                        <option key={index} value={item.id || ''}>
                            {item.name || item}
                        </option>
                    )
                )}
            </FormField>
            <RedButton type='button' onClick={() => dispatch({ type: 'RESET' })}>
                reset
            </RedButton>
        </Wrapper>
    );
};

export default CreditFilters;

const Wrapper = styled.form`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: 2rem;
`;
