import { useState, useEffect } from 'react';
import { useTVShowsContext } from '../contexts/TVShowsContext';
import tmdbAPI from '../utils/tmdbAPI';
import { FormField, RedButton } from './';
import { tmdbTVStatusOptions, tmdbRuntimeOptions, tmdbTVSortOptions } from '../utils/localData';
import { dynamicSort, getYears } from '../utils/helpers';
import styled from 'styled-components';

const TVShowFilters = ({ isLoading }) => {
    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);
    const { filters, dispatch } = useTVShowsContext();

    useEffect(() => {
        Promise.allSettled([tmdbAPI('/genre/tv/list'), tmdbAPI('/configuration/languages')]).then(
            ([res1, res2]) => {
                setGenres(res1?.value?.data?.genres || []);
                setLanguages(res2?.value?.data?.sort(dynamicSort('english_name')) || []);
            }
        );
    }, []);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'runtime') value = JSON.parse(value);
        dispatch({ type: 'UPDATE_FILTERS', payload: { name, value } });
    };

    return (
        <Wrapper onSubmit={(e) => e.preventDefault()}>
            <FormField
                name='genre'
                value={filters.genre}
                onChange={handleChange}
                disabled={isLoading}
            >
                {['All', ...genres].map((item, index) => (
                    <option key={index} value={item.id || ''}>
                        {item.name || item}
                    </option>
                ))}
            </FormField>
            <FormField
                name='language'
                value={filters.language}
                onChange={handleChange}
                disabled={isLoading}
                labelText='original language'
            >
                {['All', ...languages].map((item, index) => (
                    <option key={index} value={item.iso_639_1 || ''}>
                        {item.english_name || item}
                    </option>
                ))}
            </FormField>
            <FormField
                name='year'
                value={filters.year}
                onChange={handleChange}
                disabled={isLoading}
            >
                {['All', ...getYears()].map((item, index) => (
                    <option key={index} value={item !== 'All' ? item : ''}>
                        {item}
                    </option>
                ))}
            </FormField>
            <FormField
                name='status'
                value={filters.status}
                onChange={handleChange}
                disabled={isLoading}
            >
                {tmdbTVStatusOptions.map(({ id, value, name }) => (
                    <option key={id} value={value}>
                        {name}
                    </option>
                ))}
            </FormField>
            <FormField
                name='runtime'
                value={JSON.stringify(filters.runtime)}
                onChange={handleChange}
                disabled={isLoading}
            >
                {tmdbRuntimeOptions.map(({ id, value, name }) => (
                    <option key={id} value={JSON.stringify(value)}>
                        {name}
                    </option>
                ))}
            </FormField>
            <FormField
                name='sort'
                value={filters.sort}
                onChange={handleChange}
                disabled={isLoading}
                labelText='sort by'
            >
                {tmdbTVSortOptions.map(({ id, name, value }) => (
                    <option key={id} value={value}>
                        {name}
                    </option>
                ))}
            </FormField>
            <RedButton type='button' onClick={() => dispatch({ type: 'CLEAR_FILTERS' })}>
                clear filters
            </RedButton>
        </Wrapper>
    );
};

export default TVShowFilters;

const Wrapper = styled.form`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: 4rem;
`;
