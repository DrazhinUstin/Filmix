import { useParams, Link, Outlet } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import { Loader, Error, TextButton } from '../components';
import { formatDate } from '../utils/helpers';
import default_poster from '../assets/images/default_poster.jpg';
import styled from 'styled-components/macro';

const TVSeasonMain = () => {
    const { id, season_number } = useParams();
    const { isLoading, error, data } = useFetch(`/tv/${id}/season/${season_number}`);

    if (isLoading) return <Loader />;

    if (error) return <Error err={error} link />;

    const { name, air_date, poster_path } = data;
    return (
        <>
            <Wrapper>
                <Link to='.'>
                    <img
                        src={
                            poster_path
                                ? `http://image.tmdb.org/t/p/w92${poster_path}`
                                : default_poster
                        }
                        alt={name}
                    />
                </Link>
                <div>
                    <h2>
                        <Link to='.'>{name}</Link>
                    </h2>
                    {air_date && <p>{formatDate(air_date)}</p>}
                    <TextButton as={Link} to='../seasons' className='btn'>
                        <FaArrowLeft /> back to seasons
                    </TextButton>
                </div>
            </Wrapper>
            <Outlet context={data} />
        </>
    );
};

export default TVSeasonMain;

const Wrapper = styled.article`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 2rem;
    border-bottom: 1px solid var(--clr-green);
    border-radius: 0 0 var(--radius) var(--radius);
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
    p {
        margin: 0.25rem 0;
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
