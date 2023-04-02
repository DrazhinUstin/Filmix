import styled from 'styled-components';
import { breakpoints } from '../GlobalStyles';

const MainPageRow = styled.article`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 2rem;
    border-bottom: 1px solid var(--clr-green);
    border-radius: ${(props) => props.borderRadius || 'var(--radius) var(--radius) 0 0'};
    overflow: hidden;
    background-color: var(--clr-light-black);
    img {
        width: 5rem;
    }
    & > div {
        padding: 0.25rem 0.25rem 0.25rem 0;
    }
    h2 {
        margin-bottom: 0.25rem;
        a {
            color: var(--clr-white);
        }
    }
    h3,
    p {
        margin-bottom: 0.25rem;
        color: var(--clr-gray);
    }
    .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        svg {
            font-size: 0.9rem;
        }
    }
    @media ${breakpoints.sm} {
        gap: 1rem;
        h2 {
            font-size: 1.375rem;
            letter-spacing: unset;
        }
        h3 {
            font-size: 1.2rem;
            letter-spacing: unset;
        }
    }
`;

export default MainPageRow;
