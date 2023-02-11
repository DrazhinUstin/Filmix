import styled, { css } from 'styled-components';

const Button = styled.button`
    display: inline-block;
    margin: ${(props) => props.margin || '0'};
    padding: 0.5rem;
    border: none;
    border-radius: var(--radius);
    background-color: var(--clr-green);
    color: var(--clr-white);
    font-family: var(--font);
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.25;
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    ${(props) =>
        props.withBorder &&
        css`
            border: 1px solid var(--clr-green);
            background-color: transparent;
            &:hover {
                background-color: var(--clr-green);
            }
        `}
`;

export default Button;
