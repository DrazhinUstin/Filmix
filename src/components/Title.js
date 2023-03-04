import styled from 'styled-components';

const Title = styled.h2`
    margin: ${(props) => props.margin || '0 0 4rem'};
    text-align: center;
    font-size: ${(props) => props.fontSize || '2rem'};
    span {
        color: var(--clr-green);
    }
`;

export default Title;

const AltTitle = styled(Title)`
    margin: ${(props) => props.margin || '0 0 2rem'};
    padding-left: 0.5rem;
    border-left: 3px solid var(--clr-green);
    text-align: left;
    font-size: ${(props) => props.fontSize || '1.5rem'};
`;

export { AltTitle };
