import styled from 'styled-components';

const Sort = ({ name = 'sort', value, onChange, isLoading, options, labelText = 'Sort by:' }) => {
    return (
        <Wrapper>
            <label htmlFor={name}>{labelText}</label>
            <select name={name} id={name} value={value} onChange={onChange} disabled={isLoading}>
                {options.map(({ name, value }, index) => (
                    <option key={index} value={value}>
                        {name}
                    </option>
                ))}
            </select>
        </Wrapper>
    );
};

export default Sort;

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.375rem;
    margin-bottom: 1rem;
    select {
        flex-shrink: 0;
        outline: none;
        border: none;
        background-color: transparent;
        color: var(--clr-white);
        font-family: var(--font);
        font-size: 1rem;
        option {
            color: var(--clr-black);
        }
        &:focus {
            color: var(--clr-green);
        }
    }
`;
