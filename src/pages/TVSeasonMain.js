import { useParams, Link, Outlet } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import { Loader, Error, MainPageRow, TextButton } from '../components';
import { formatDate } from '../utils/helpers';
import default_poster from '../assets/images/default_poster.jpg';

const TVSeasonMain = () => {
    const { id, season_number } = useParams();
    const { isLoading, error, data } = useFetch(`/tv/${id}/season/${season_number}`);

    if (isLoading) return <Loader />;

    if (error) return <Error err={error} link />;

    const { name, air_date, poster_path } = data;
    return (
        <>
            <MainPageRow borderRadius='0'>
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
                    {air_date && <p>{formatDate(air_date)}</p>}
                    <TextButton as={Link} to='../seasons' className='btn'>
                        <FaArrowLeft /> back to seasons
                    </TextButton>
                </div>
            </MainPageRow>
            <Outlet context={data} />
        </>
    );
};

export default TVSeasonMain;
