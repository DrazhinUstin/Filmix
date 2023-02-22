import { useState, useEffect } from 'react';
import { useMoviesContext } from '../contexts/MoviesContext';
import tmdbAPI from '../utils/tmdbAPI';
import { tmdbSortOptions, tmdbRuntimeOptions } from '../utils/localData';
import { dynamicSort, getYears } from '../utils/helpers';
import { FormField, RedButton } from './';
import styled from 'styled-components';

const MovieFilters = ({ isLoading }) => {
    const [genres, setGenres] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [certifications, setCertifications] = useState([]);
    const { filters, dispatch } = useMoviesContext();

    useEffect(() => {
        Promise.allSettled([
            tmdbAPI('/genre/movie/list'),
            tmdbAPI('/configuration/languages'),
            tmdbAPI('/certification/movie/list'),
        ]).then((values) => {
            setGenres(values[0]?.value?.data?.genres || []);
            setLanguages(values[1]?.value?.data?.sort(dynamicSort('english_name')) || []);
            setCertifications(values[2]?.value?.data?.certifications?.US || []);
        });
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
                    <option key={index} value={item === 'all' ? '' : item}>
                        {item}
                    </option>
                ))}
            </FormField>
            <FormField
                name='runtime'
                value={JSON.stringify(filters.runtime)}
                onChange={handleChange}
                disabled={isLoading}
            >
                {tmdbRuntimeOptions.map(({ id, name, value }) => (
                    <option key={id} value={JSON.stringify(value)}>
                        {name}
                    </option>
                ))}
            </FormField>
            <FormField
                name='certification'
                value={filters.certification}
                onChange={handleChange}
                disabled={isLoading}
            >
                {['All', ...certifications].map((item, index) => (
                    <option key={index} value={item.certification || ''}>
                        {item.certification || item}
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
                {tmdbSortOptions.map(({ id, name, value }) => (
                    <option key={id} value={value}>
                        {name}
                    </option>
                ))}
            </FormField>
            <RedButton
                type='button'
                onClick={() => dispatch({ type: 'RESTORE_FILTERS' })}
                disabled={isLoading}
            >
                clear filters
            </RedButton>
        </Wrapper>
    );
};

export default MovieFilters;

const Wrapper = styled.form`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: 4rem;
`;
