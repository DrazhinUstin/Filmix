import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Loader, Error, Title, ImageGallery, Button } from '../components';

const PersonImages = () => {
    const { id } = useParams();
    const { isLoading, error, data } = useFetch(`/person/${id}/images`);

    if (isLoading) return <Loader />;

    if (error) return <Error err={error} link />;

    if (!data.profiles.length)
        return (
            <Error title='images were not found' link={{ title: 'back to person', path: '..' }} />
        );

    return (
        <>
            <Title margin='4rem 0'>
                image <span>gallery</span>
            </Title>
            <ImageGallery items={data.profiles} imgSizes={{ sm: 'w185', lg: 'h632' }} />
            <Button margin='4rem 0 0' as={Link} to='..'>
                back to person
            </Button>
        </>
    );
};

export default PersonImages;
