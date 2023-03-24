import { useParams, useMatch, Link, Outlet } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import { Loader, Error, TextButton } from '../components';
import default_poster from '../assets/images/default_poster.jpg';
import styled from 'styled-components';

const PersonMain = () => {
    const { id } = useParams();
    const { isLoading, error, data } = useFetch(`/person/${id}`);
    const match = useMatch('people/:id');

    if (isLoading) return <Loader fullScreen />;

    if (error) return <Error err={error} link fullScreen />;

    const { name, birthday, profile_path } = data;
    return (
        <main className='main'>
            {!match && (
                <Wrapper>
                    <Link to='.'>
                        <img
                            src={
                                profile_path
                                    ? `http://image.tmdb.org/t/p/w185${profile_path}`
                                    : default_poster
                            }
                            alt={name}
                        />
                    </Link>
                    <div>
                        <h2>
                            <Link to='.'>{name}</Link>
                        </h2>
                        {birthday && <h3>{birthday.split('-')[0]}</h3>}
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

export default PersonMain;

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
