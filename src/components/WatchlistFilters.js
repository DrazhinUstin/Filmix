import useFetch from '../hooks/useFetch';
import { FormField, RedButton } from './';
import { watchlistOrderOptions, watchlistLimitOptions } from '../utils/localData';
import styled from 'styled-components';

const WatchlistFilters = ({ filters, setFilters, isLoading }) => {
    const { data } = useFetch('/genre/movie/list');

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'order') value = JSON.parse(value);
        if (name === 'limit') value = +value;
        setFilters({ ...filters, [name]: value });
    };

    return (
        <Wrapper>
            <FormField
                name='genre'
                value={filters.genre}
                onChange={handleChange}
                disabled={isLoading}
            >
                {['All', ...(data?.genres || data)].map((item, index) => (
                    <option key={index} value={item.name || ''}>
                        {item.name || item}
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
                onClick={() => setFilters({ ...filters, genre: '' })}
                disabled={isLoading}
            >
                clear filters
            </RedButton>
        </Wrapper>
    );
};

export default WatchlistFilters;

const Wrapper = styled.form`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: 4rem;
`;
