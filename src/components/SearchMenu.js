import { tmdbSearchOptions } from '../utils/localData';
import styled from 'styled-components';

const SearchMenu = ({ type, setType, isLoading }) => {
    return (
        <Wrapper>
            {tmdbSearchOptions.map(({ id, name, value }) => (
                <button
                    key={id}
                    onClick={() => setType(value)}
                    className={value === type ? 'active' : null}
                    disabled={isLoading}
                >
                    {name}
                </button>
            ))}
        </Wrapper>
    );
};

export default SearchMenu;

const Wrapper = styled.section`
    max-width: 800px;
    display: flex;
    margin: 0 auto 4rem;
    border-radius: var(--radius);
    background-color: var(--clr-light-black);
    & > * {
        width: 100%;
        display: inline-block;
        padding: 0.5rem;
        border: none;
        border-radius: var(--radius);
        background-color: transparent;
        color: var(--clr-white);
        font-family: var(--font);
        font-size: 1rem;
        text-transform: capitalize;
        &.active {
            background-color: var(--clr-green);
        }
    }
`;
