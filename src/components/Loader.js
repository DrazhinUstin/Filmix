import { ReactComponent as Spinner } from '../assets/animated/spinner.svg';
import styled, { css } from 'styled-components';

const Loader = ({ fullScreen }) => {
    return (
        <Wrapper fullScreen={fullScreen}>
            <Spinner />
        </Wrapper>
    );
};

export default Loader;

const Wrapper = styled.section`
    margin: 4rem 0;
    ${(props) =>
        props.fullScreen &&
        css`
            height: 100vh;
            display: grid;
            place-items: center;
            margin: 0;
        `}
`;
