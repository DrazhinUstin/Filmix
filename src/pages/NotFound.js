import { Link } from 'react-router-dom';
import { Title, Button } from '../components';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

const NotFound = () => {
    return (
        <Wrapper className='section-center'>
            <article>
                <h1>404</h1>
                <Title margin='1.5rem 0'>page not found</Title>
                <p>We can't seem to find the page you're looking for...</p>
                <Button as={Link} to='/'>
                    back home
                </Button>
            </article>
        </Wrapper>
    );
};

export default NotFound;

const Wrapper = styled.section`
    height: 100vh;
    display: grid;
    place-items: center;
    text-align: center;
    h1 {
        color: var(--clr-black);
        font-size: 12rem;
        line-height: 1;
        text-shadow: 2px 2px 2px var(--clr-green);
        @media ${breakpoints.xsm} {
            font-size: 10rem;
        }
    }
    p {
        margin-bottom: 2rem;
        font-size: 1.2rem;
    }
`;
