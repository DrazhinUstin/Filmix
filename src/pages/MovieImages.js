import { useParams, Link } from 'react-router-dom';
import { Loader, Error, Title, ImageGallery, Button } from '../components';
import useFetch from '../hooks/useFetch';

const MovieImages = () => {
    const { id } = useParams();
    const { isLoading, error, data } = useFetch(`/movie/${id}/images`);

    if (isLoading) return <Loader fullScreen />;

    if (error) return <Error err={error} link fullScreen />;

    if (!data.backdrops.length)
        return (
            <Error
                title='images were not found'
                link={{ title: 'back to movie', path: '..' }}
                fullScreen
            />
        );

    return (
        <main className='main'>
            <Title>
                image <span>gallery</span>
            </Title>
            <ImageGallery items={data.backdrops} />
            <Button margin='4rem 0 0' as={Link} to='..'>
                back to movie
            </Button>
        </main>
    );
};

export default MovieImages;
