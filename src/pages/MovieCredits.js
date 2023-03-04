import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Loader, Error, Title, AltTitle, PersonList, Pagination, Button } from '../components';

const MovieCredits = ({ itemsPerPage = 20 }) => {
    const { id } = useParams();
    const { isLoading, error, data } = useFetch(`/movie/${id}/credits`);
    const [offset, setOffset] = useState(0);

    if (isLoading) return <Loader fullScreen />;

    if (error) return <Error err={error} link fullScreen />;

    if (!data.cast.length && !data.crew.length)
        return (
            <Error
                title='credits were not found'
                link={{ title: 'back to movie', path: '..' }}
                fullScreen
            />
        );

    const director = data.crew.find(({ job }) => job === 'Director');
    return (
        <main className='main'>
            <Title>
                movie <span>credits</span>
            </Title>
            {director && (
                <section className='section-sm'>
                    <AltTitle>crew:</AltTitle>
                    <PersonList items={[director]} />
                </section>
            )}
            {data.cast.length > 0 && (
                <section className='section-sm'>
                    <AltTitle>cast:</AltTitle>
                    <PersonList items={data.cast.slice(offset, offset + itemsPerPage)} />
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
                back to movie
            </Button>
        </main>
    );
};

export default MovieCredits;
