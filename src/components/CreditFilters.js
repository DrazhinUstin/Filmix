import useFetch from '../hooks/useFetch';
import { FormField, RedButton } from './';
import { sortOptions } from '../utils/localData';
import styled from 'styled-components';

const CreditFilters = ({ credits, filters, dispatch }) => {
    const { data } = useFetch('/genre/movie/list');

    const handleFilters = (e) =>
        dispatch({
            type: 'UPDATE_FILTERS',
            payload: { name: e.target.name, value: e.target.value },
        });

    return (
        <Wrapper onSubmit={(e) => e.preventDefault()}>
            <FormField name='department' value={filters.department} onChange={handleFilters}>
                {Object.keys(credits).map((key) => (
                    <option key={key} value={key}>{`${key} (${credits[key].length})`}</option>
                ))}
            </FormField>
            <FormField name='genre' value={filters.genre} onChange={handleFilters}>
                {['All', ...(data?.genres || [])].map((item, index) => (
                    <option key={index} value={item.id || ''}>
                        {item.name || item}
                    </option>
                ))}
            </FormField>
            <FormField name='sort' value={filters.sort} onChange={handleFilters}>
                {sortOptions.map(({ id, name, value }) => (
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

export default CreditFilters;

const Wrapper = styled.form`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: 2rem;
`;
