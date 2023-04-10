import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useGlobalContext } from '../contexts/GlobalContext';
import styled from 'styled-components';

const SearchForm = () => {
    const { isSearchEnabled, dispatch } = useGlobalContext();
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSearchEnabled) inputRef.current.focus();
    }, [isSearchEnabled]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = inputRef.current.value;
        if (!query.trim()) return;
        navigate(`/search/${query}`);
    };

    return (
        <Wrapper isVisible={isSearchEnabled}>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Search a movie...' ref={inputRef} />
                <button type='button' onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })}>
                    <FaTimes />
                </button>
            </form>
        </Wrapper>
    );
};

export default SearchForm;

const Wrapper = styled.section`
    position: fixed;
    top: 0;
    width: 100%;
    height: var(--navbar-height);
    display: ${(props) => (props.isVisible ? 'grid' : 'none')};
    place-items: center;
    background-color: var(--clr-light-black);
    z-index: 999;
    form {
        max-width: var(--max-content-width);
        width: 90vw;
        display: flex;
    }
    input {
        width: 100%;
        outline: none;
        border: none;
        background-color: transparent;
        color: var(--clr-white);
        font-size: 1.2rem;
    }
    button {
        flex-shrink: 0;
        border: none;
        background-color: transparent;
        color: var(--clr-white);
        font-size: 1.5rem;
    }
`;
