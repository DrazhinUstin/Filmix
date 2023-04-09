import { useParams, useMatch, Link, Outlet } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import useRecentlyViewed from '../hooks/useRecentlyViewed';
import { Loader, Error, MainPageRow, TextButton } from '../components';
import default_poster from '../assets/images/default_poster.jpg';

const TVShowMain = () => {
    const { id } = useParams();
    const { isLoading, error, data } = useFetch(`/tv/${id}`);
    const match = useMatch('tv/:id');
    useRecentlyViewed(data);

    if (isLoading) return <Loader fullScreen />;

    if (error) return <Error err={error} link fullScreen />;

    const { poster_path, name, first_air_date } = data;
    return (
        <main className='main'>
            {!match && (
                <MainPageRow>
                    <Link to='.'>
                        <img
                            src={
                                poster_path
                                    ? `https://image.tmdb.org/t/p/w92${poster_path}`
                                    : default_poster
                            }
                            alt={name}
                        />
                    </Link>
                    <div>
                        <h2>
                            <Link to='.'>{name}</Link>
                        </h2>
                        {first_air_date && <h3>{first_air_date.split('-')[0]}</h3>}
                        <TextButton as={Link} to='.' className='btn'>
                            <FaArrowLeft /> back to main
                        </TextButton>
                    </div>
                </MainPageRow>
            )}
            <Outlet context={data} />
        </main>
    );
};

export default TVShowMain;
