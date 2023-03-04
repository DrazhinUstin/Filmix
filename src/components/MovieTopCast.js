import useFetch from '../hooks/useFetch';
import { Link } from 'react-router-dom';
import { Loader, Error, AltTitle, HorizontalMenu, TextButton } from '.';

const MovieTopCast = ({ id }) => {
    const { isLoading, error, data } = useFetch(`/movie/${id}/credits`);

    if (isLoading) return <Loader />;

    if (error) return <Error title='failed to fetch credits' err={error} />;

    const cast = data.cast.slice(0, 20);
    const director = data.crew.find(({ job }) => job === 'Director');
    const items = director ? [director, ...cast] : cast;
    return (
        items.length > 0 && (
            <section className='section-sm'>
                <AltTitle margin='0 0 1rem'>cast & crew:</AltTitle>
                <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                    <TextButton as={Link} to='credits'>
                        Full Cast & Crew
                    </TextButton>
                </div>
                <HorizontalMenu items={items} />
            </section>
        )
    );
};

export default MovieTopCast;
