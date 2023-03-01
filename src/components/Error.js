import { Link } from 'react-router-dom';
import { Title, Button } from './';
import styled, { css } from 'styled-components';

const Error = ({ title, err, link, fullScreen }) => {
    return (
        <Wrapper fullScreen={fullScreen}>
            <Title>{title || 'there was an error'}</Title>
            {err && <p>{err.status_message || err.message}</p>}
            {link && (
                <Button to={link.path || '/'} as={Link} $withBorder>
                    {link.title || 'back home'}
                </Button>
            )}
        </Wrapper>
    );
};

export default Error;

const Wrapper = styled.section`
    max-width: var(--max-content-width);
    width: 90vw;
    margin: 4rem auto;
    text-align: center;
    ${(props) =>
        props.fullScreen &&
        css`
            min-height: var(--fullscreen);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            margin: 0 auto;
        `}
    h2 {
        margin-bottom: 2rem;
        font-size: 2rem;
    }
    p {
        text-decoration: underline;
        text-decoration-color: var(--clr-green);
        font-size: 1.2rem;
    }
    a {
        margin-top: 2rem;
    }
`;
