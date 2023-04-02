import styled from 'styled-components';

const GridList = styled.ul`
    display: grid;
    gap: 1rem;
    li {
        display: grid;
        grid-template-columns: ${(props) => props.columns || '10rem 1fr'};
        font-size: ${(props) => props.fontSize || '1.2rem'};
        font-weight: ${(props) => props.fontWeight || '500'};
        span {
            color: ${(props) => props.color || 'var(--clr-gray)'};
            font-weight: normal;
        }
    }
`;

export default GridList;
