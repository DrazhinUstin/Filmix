import { useParams, Link } from 'react-router-dom';
import { Loader, Error, Title, ImageGallery, Button } from '../components';
import useFetch from '../hooks/useFetch';

const MovieImages = () => {
    const { id } = useParams();
    const { isLoading, error, data } = useFetch(`/movie/${id}/images`);

    if (isLoading) return <Loader fullScreen />;

    if (error) return <Error msg={error.message} fullScreen />;

    return (
        <main className='main'>
            <Title>image gallery</Title>
            <ImageGallery items={data.backdrops} />
            <Button margin='4rem 0 0' as={Link} to='..'>
                back to movie
            </Button>
        </main>
    );
};

export default MovieImages;
