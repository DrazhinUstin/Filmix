import { useEffect } from 'react';
import tmdbAPI from '../utils/tmdbAPI';
import { useWatchlistContext } from '../contexts/WatchlistContext';
import { FormField, RedButton } from './';
import {
    watchlistMediaTypeOptions,
    watchlistOrderOptions,
    watchlistLimitOptions,
} from '../utils/localData';
import styled from 'styled-components';

const WatchlistFilters = ({ isLoading }) => {
    const { media_type, genres, filters, dispatch } = useWatchlistContext();

    useEffect(() => {
        Promise.allSettled([tmdbAPI('/genre/movie/list'), tmdbAPI('/genre/tv/list')]).then(
            (values) => dispatch({ type: 'SET_GENRES', payload: values })
        );
    }, [dispatch]);

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'order') value = JSON.parse(value);
        if (name === 'limit') value = +value;
        dispatch({ type: 'UPDATE_FILTERS', payload: { name, value } });
    };

    return (
        <Wrapper>
            <FormField
                name='type'
                value={media_type}
                onChange={(e) => dispatch({ type: 'SWITCH_MEDIA_TYPE', payload: e.target.value })}
                disabled={isLoading}
            >
                {watchlistMediaTypeOptions.map(({ id, value, name }) => (
                    <option key={id} value={value}>
                        {name}
                    </option>
                ))}
            </FormField>
            <FormField
                name='genre'
                value={filters.genre}
                onChange={handleChange}
                disabled={isLoading}
            >
                {[
                    'All',
                    ...(!media_type
                        ? new Set(Object.values(genres).flat().sort())
                        : genres[media_type]),
                ].map((item, index) => (
                    <option key={index} value={item !== 'All' ? item : ''}>
                        {item}
                    </option>
                ))}
            </FormField>
            <FormField
                name='order'
                value={JSON.stringify(filters.order)}
                onChange={handleChange}
                disabled={isLoading}
                labelText='order by'
            >
                {watchlistOrderOptions.map(({ id, value, name }) => (
                    <option key={id} value={JSON.stringify(value)}>
                        {name}
                    </option>
                ))}
            </FormField>
            <FormField
                name='limit'
                value={filters.limit}
                onChange={handleChange}
                disabled={isLoading}
                labelText='show by'
            >
                {watchlistLimitOptions.map((item, index) => (
                    <option key={index} value={item}>
                        {item}
                    </option>
                ))}
            </FormField>
            <RedButton
                type='button'
                onClick={() => dispatch({ type: 'RESET' })}
                disabled={isLoading}
            >
                reset
            </RedButton>
        </Wrapper>
    );
};

export default WatchlistFilters;

const Wrapper = styled.form`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: 4rem;
`;
