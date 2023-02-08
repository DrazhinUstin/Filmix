import styled from 'styled-components';

const Title = styled.h2`
    margin: ${(props) => props.margin || '0 0 4rem'};
    text-align: center;
    font-size: ${(props) => props.fontSize || '2.5rem'};
    span {
        color: var(--clr-green);
    }
`;

export default Title;
