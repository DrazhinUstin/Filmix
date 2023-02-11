import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Loader, Error, Button } from './';
import { cutString } from '../utils/helpers';
import styled from 'styled-components';

const Hero = () => {
    const { isLoading, error, data } = useFetch('/movie/now_playing');

    if (isLoading) return <Loader fullScreen />;

    if (error) return <Error err={error} fullScreen />;

    const { id, title, overview, backdrop_path } =
        data.results[Math.floor(Math.random() * data.results.length)];
    return (
        <Wrapper url={backdrop_path}>
            <div className='section-center'>
                <article>
                    <h1>{title}</h1>
                    <p>{cutString(overview)}</p>
                    <Button as={Link} to={`/movies/${id}`} withBorder>
                        view details
                    </Button>
                </article>
            </div>
        </Wrapper>
    );
};

export default Hero;

const Wrapper = styled.section`
    height: 75vh;
    background: ${(props) =>
        `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1) 90%), url(https://image.tmdb.org/t/p/original${props.url}) no-repeat center/cover`};
    display: grid;
    align-items: center;
    article {
        max-width: 600px;
        h1 {
            font-size: 2.5rem;
        }
        p {
            margin: 1rem 0 1.5rem;
            font-size: 1.2rem;
        }
    }
`;
