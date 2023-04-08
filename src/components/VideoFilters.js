import { FormField, RedButton } from '.';
import styled from 'styled-components';

const VideoFilters = ({ data, filters, allTypes, allSizes, allSites, dispatch }) => {
    const handleChange = (e) =>
        dispatch({
            type: 'UPDATE_FILTERS',
            payload: { name: e.target.name, value: e.target.value },
        });
    return (
        <Wrapper>
            <FormField name='type' value={filters.type} onChange={handleChange}>
                {allTypes.map((item, index) => (
                    <option key={index} value={item !== 'All' ? item : ''}>
                        {item} (
                        {item !== 'All'
                            ? data.filter(({ type }) => type === item).length
                            : data.length}
                        )
                    </option>
                ))}
            </FormField>
            <FormField name='size' value={filters.size} onChange={handleChange}>
                {allSizes.map((item, index) => (
                    <option key={index} value={item !== 'All' ? item : ''}>
                        {item !== 'All' ? `${item}p` : item}
                    </option>
                ))}
            </FormField>
            <FormField name='site' value={filters.site} onChange={handleChange}>
                {allSites.map((item, index) => (
                    <option key={index} value={item !== 'All' ? item : ''}>
                        {item}
                    </option>
                ))}
            </FormField>
            <RedButton
                onClick={() => dispatch({ type: 'CLEAR_FILTERS' })}
                disabled={!Object.values(filters).join('')}
            >
                clear filters
            </RedButton>
        </Wrapper>
    );
};

export default VideoFilters;

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    align-items: flex-end;
    gap: 1rem;
    margin-bottom: 4rem;
`;
