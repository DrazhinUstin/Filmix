import styled from 'styled-components';

const TextButton = styled.button.attrs((props) => ({
    type: props.type || 'button',
}))`
    display: inline-block;
    border: none;
    background-color: transparent;
    color: var(--clr-green);
    font-family: var(--font);
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.5;
    text-transform: capitalize;
    &:hover {
        text-decoration: underline;
    }
`;

export default TextButton;
