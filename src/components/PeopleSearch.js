import { FaSearch } from 'react-icons/fa';
import { usePeopleContext } from '../contexts/PeopleContext';
import styled from 'styled-components';

const PeopleSearch = () => {
    const { query, dispatch } = usePeopleContext();
    return (
        <Wrapper onSubmit={(e) => e.preventDefault()}>
            <input
                type='text'
                placeholder='Search a person'
                value={query}
                onChange={(e) => dispatch({ type: 'UPDATE_QUERY', payload: e.target.value })}
                required
            />
            <FaSearch />
        </Wrapper>
    );
};

export default PeopleSearch;

const Wrapper = styled.form`
    position: relative;
    max-width: 25rem;
    margin: 4rem auto;
    input {
        width: 100%;
        padding: 0.5rem 2rem 0.5rem 0.5rem;
        outline: none;
        border: none;
        border-radius: var(--radius);
        background-color: var(--clr-white);
        color: var(--clr-black);
        font-family: var(--font);
        font-size: 1rem;
        &:focus {
            background-color: var(--clr-light-black);
            color: var(--clr-green);
            box-shadow: 0 0 0 2px var(--clr-green);
            & ~ svg {
                color: var(--clr-green);
            }
        }
    }
    svg {
        position: absolute;
        top: 50%;
        right: 0.375rem;
        transform: translateY(-50%);
        color: var(--clr-light-black);
        font-size: 1.2rem;
        pointer-events: none;
    }
`;
