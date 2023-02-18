import { useState, useEffect } from 'react';
import { useMoviesContext } from '../contexts/MoviesContext';
import tmdbAPI from '../utils/tmdbAPI';
import { tmdbSortOptions, tmdbRuntimeOptions } from '../utils/localData';
import { dynamicSort, getYears } from '../utils/helpers';
import { RedButton } from './';
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
            <div>
                <label htmlFor='genre'>genre:</label>
                <select
                    name='genre'
                    id='genre'
                    value={filters.genre}
                    onChange={handleChange}
                    disabled={isLoading}
                >
                    {['All', ...genres].map((item, index) => (
                        <option key={index} value={item.id || ''}>
                            {item.name || item}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='language'>original language:</label>
                <select
                    name='language'
                    id='language'
                    value={filters.language}
                    onChange={handleChange}
                    disabled={isLoading}
                >
                    {['All', ...languages].map((item, index) => (
                        <option key={index} value={item.iso_639_1 || ''}>
                            {item.english_name || item}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='year'>year:</label>
                <select
                    name='year'
                    id='year'
                    value={filters.year}
                    onChange={handleChange}
                    disabled={isLoading}
                >
                    {['All', ...getYears()].map((item, index) => (
                        <option key={index} value={item === 'all' ? '' : item}>
                            {item}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='runtime'>runtime:</label>
                <select
                    name='runtime'
                    id='runtime'
                    value={JSON.stringify(filters.runtime)}
                    onChange={handleChange}
                    disabled={isLoading}
                >
                    {tmdbRuntimeOptions.map(({ id, name, value }) => (
                        <option key={id} value={JSON.stringify(value)}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='certification'>certification:</label>
                <select
                    name='certification'
                    id='certification'
                    value={filters.certification}
                    onChange={handleChange}
                    disabled={isLoading}
                >
                    {['All', ...certifications].map((item, index) => (
                        <option key={index} value={item.certification || ''}>
                            {item.certification || item}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='sort'>sort by:</label>
                <select
                    name='sort'
                    id='sort'
                    value={filters.sort}
                    onChange={handleChange}
                    disabled={isLoading}
                >
                    {tmdbSortOptions.map(({ id, name, value }) => (
                        <option key={id} value={value}>
                            {name}
                        </option>
                    ))}
                </select>
            </div>
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
    label {
        display: block;
        margin-bottom: 0.375rem;
        text-transform: capitalize;
    }
    select {
        display: block;
        width: 100%;
        padding: 0.5rem 0.25rem;
        outline: none;
        border: none;
        background-color: var(--clr-white);
        color: var(--clr-black);
        font-size: 0.9rem;
        &:focus {
            box-shadow: 0 0 0 2px var(--clr-green);
        }
    }
`;
