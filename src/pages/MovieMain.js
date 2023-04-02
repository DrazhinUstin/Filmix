import { useParams, useMatch, Link, Outlet } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { Loader, Error, MainPageRow, TextButton } from '../components';
import useFetch from '../hooks/useFetch';
import defaultPoster from '../assets/images/default_poster.jpg';

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
                <MainPageRow>
                    <Link to='.'>
                        <img
                            src={
                                poster_path
                                    ? `https://image.tmdb.org/t/p/w92${poster_path}`
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
                </MainPageRow>
            )}
            <Outlet context={data} />
        </main>
    );
};

export default MovieMain;
