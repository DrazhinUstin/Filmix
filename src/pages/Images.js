import { useParams, Link } from 'react-router-dom';
import { Loader, Error, Title, ImageGallery, Button } from '../components';
import useFetch from '../hooks/useFetch';

const Images = ({ media_type = 'movie', label = media_type }) => {
    const { id, season_number, episode_number } = useParams();
    const { isLoading, error, data } = useFetch(
        `/${media_type}/${id}/${season_number ? `season/${season_number}/` : ''}${
            episode_number ? `episode/${episode_number}/` : ''
        }images`
    );

    if (isLoading) return <Loader />;

    if (error) return <Error err={error} link />;

    const images = data.backdrops || data.stills || data.profiles || [];
    if (!images.length)
        return (
            <Error title='images were not found' link={{ title: `back to ${label}`, path: '..' }} />
        );

    return (
        <>
            <Title margin='4rem 0'>
                image <span>gallery</span>
            </Title>
            <ImageGallery
                items={images}
                imgSizes={
                    data.backdrops
                        ? { sm: 'w300', lg: 'w1280' }
                        : data.stills
                        ? { sm: 'w300', lg: 'original' }
                        : { sm: 'w185', lg: 'h632' }
                }
            />
            <Button margin='4rem 0 0' as={Link} to='..'>
                back to {label}
            </Button>
        </>
    );
};

export default Images;
