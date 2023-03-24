import { useParams, useMatch, Link, Outlet } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Loader, Error, TextButton } from '../components';
import useFetch from '../hooks/useFetch';
import defaultPoster from '../assets/images/default_poster.jpg';
import styled from 'styled-components';

const MovieMain = () => {
    const { id } = useParams();
    const { isLoading, error, data } = useFetch(`/movie/${id}`);
    const match = useMatch('movies/:id');

    if (isLoading) return <Loader fullScreen />;

    if (error) return <Error err={error} link fullScreen />;

    const { poster_path, title, release_date } = data;
    return (
        <main className='main'>
            {!match && (
                <Wrapper>
                    <Link to='.'>
                        <img
                            src={
                                poster_path
                                    ? `http://image.tmdb.org/t/p/w92${poster_path}`
                                    : defaultPoster
                            }
                            alt={title}
                        />
                    </Link>
                    <div>
                        <h2>
                            <Link to='.'>{title}</Link>
                        </h2>
                        {release_date && <h3>{release_date.split('-')[0]}</h3>}
                        <TextButton as={Link} to='.' className='btn'>
                            <FaArrowLeft /> back to main
                        </TextButton>
                    </div>
                </Wrapper>
            )}
            <Outlet context={data} />
        </main>
    );
};

export default MovieMain;

const Wrapper = styled.article`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 2rem;
    border-bottom: 1px solid var(--clr-green);
    border-radius: var(--radius) var(--radius) 0 0;
    overflow: hidden;
    background-color: var(--clr-light-black);
    img {
        width: 5rem;
    }
    h2 {
        margin-bottom: 0.25rem;
        a {
            color: var(--clr-white);
        }
    }
    h3 {
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
`;
