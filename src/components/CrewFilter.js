import FormField from './FormField';
import styled from 'styled-components';

const CrewFilter = ({ credits, department, allDepartments, dispatch }) => {
    return (
        <Wrapper>
            <FormField
                name='department'
                value={department}
                onChange={(e) => dispatch({ type: 'UPDATE_DEPARTMENT', payload: e.target.value })}
            >
                {allDepartments.map((item, index) => (
                    <option key={index} value={item !== 'All' ? item : ''}>
                        {item} (
                        {item === 'All'
                            ? credits.crew.length
                            : credits.crew.filter(({ department: dep }) => dep === item).length}
                        )
                    </option>
                ))}
            </FormField>
        </Wrapper>
    );
};

export default CrewFilter;

const Wrapper = styled.div`
    margin-bottom: 2rem;
    select {
        max-width: 15rem;
    }
`;
