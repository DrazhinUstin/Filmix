import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Loader, Error, Title, AltTitle, GridView, Pagination, Button } from '../components';

const MovieCredits = ({ urlPart = 'movie', name = 'movie', itemsPerPage = 20 }) => {
    const { id, season_number, episode_number } = useParams();
    const { isLoading, error, data } = useFetch(
        `/${urlPart}/${id}/${season_number ? `season/${season_number}/` : ''}${
            episode_number ? `episode/${episode_number}/` : ''
        }${urlPart === 'movie' || episode_number ? 'credits' : 'aggregate_credits'}`
    );
    const [offset, setOffset] = useState(0);

    if (isLoading) return <Loader fullScreen />;

    if (error) return <Error err={error} link fullScreen />;

    if (!data.cast.length && !data.crew.length)
        return (
            <Error
                title='credits were not found'
                link={{ title: `back to ${name}`, path: '..' }}
                fullScreen
            />
        );

    const director = data.crew.find(({ job }) => job === 'Director');
    return (
        <main className='main'>
            <Title>
                {name} <span>credits</span>
            </Title>
            {director && (
                <section className='section-sm'>
                    <AltTitle>crew:</AltTitle>
                    <GridView items={[director]} />
                </section>
            )}
            {data.cast.length > 0 && (
                <section className='section-sm'>
                    <AltTitle>cast:</AltTitle>
                    <GridView items={data.cast.slice(offset, offset + itemsPerPage)} />
                    {data.cast.length > itemsPerPage && (
                        <Pagination
                            pageCount={Math.ceil(data.cast.length / itemsPerPage)}
                            handlePageClick={(e) => setOffset(e.selected * itemsPerPage)}
                            marginTop='2rem'
                        />
                    )}
                </section>
            )}
            <Button as={Link} to='..' margin='2rem 0 0'>
                back to {name}
            </Button>
        </main>
    );
};

export default MovieCredits;
