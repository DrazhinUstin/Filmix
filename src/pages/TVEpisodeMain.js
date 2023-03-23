import { useParams, useOutletContext, useMatch, Link, Outlet } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import { Loader, Error, TextButton } from '../components';

const TVEpisodeMain = () => {
    const { id, season_number, episode_number } = useParams();
    const { isLoading, error, data } = useFetch(
        `/tv/${id}/season/${season_number}/episode/${episode_number}`
    );
    const seasonData = useOutletContext();
    const match = useMatch('/tv/:id/seasons/:season_number/episode/:episode_number');

    if (isLoading) return <Loader />;

    if (error) return <Error err={error} link />;

    return (
        <>
            {!match && (
                <section className='section-sm'>
                    <TextButton
                        as={Link}
                        to='.'
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
                    >
                        <FaArrowLeft style={{ fontSize: '0.9rem' }} /> {data.name}
                    </TextButton>
                </section>
            )}
            <Outlet context={{ seasonData, episodeData: data }} />
        </>
    );
};

export default TVEpisodeMain;
