import { FormField, RedButton } from '../components';
import { watchlistMediaTypeOptions } from '../utils/localData';
import styled from 'styled-components';

const RatingFilters = ({ filters, dispatch, isLoading }) => {
    const handleChange = (e) =>
        dispatch({
            type: 'UPDATE_FILTERS',
            payload: { name: [e.target.name], value: e.target.value },
        });
    return (
        <Wrapper>
            <FormField
                name='media_type'
                value={filters.media_type}
                onChange={handleChange}
                disabled={isLoading}
                labelText='type'
            >
                {watchlistMediaTypeOptions.map(({ id, value, name }) => (
                    <option key={id} value={value}>
                        {name}
                    </option>
                ))}
            </FormField>
            <FormField
                name='rating'
                value={filters.rating}
                onChange={handleChange}
                disabled={isLoading}
            >
                {['All', ...Array(10).fill()].map((item, index) => (
                    <option key={index} value={item !== 'All' ? index : ''}>
                        {item !== 'All' ? `Rated ${index} star` : item}
                    </option>
                ))}
            </FormField>
            <RedButton onClick={() => dispatch({ type: 'CLEAR_FILTERS' })}>clear filters</RedButton>
        </Wrapper>
    );
};

export default RatingFilters;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(17.5rem, 1fr));
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: 2rem;
`;
