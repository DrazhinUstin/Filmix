import { useReducer } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Loader, Error, Title, ImagesFilter, ImageGallery, Button } from '../components';
import useFetch from '../hooks/useFetch';
import reducer from '../reducers/imagesReducer';
import { tmdbImgSizes } from '../utils/localData';

const initialState = {
    allTypes: [],
    type: '',
    images: {},
};

const Images = ({ media_type = 'movie', label = media_type }) => {
    const { id, season_number, episode_number } = useParams();
    const { isLoading, error } = useFetch(
        `/${media_type}/${id}/${season_number ? `season/${season_number}/` : ''}${
            episode_number ? `episode/${episode_number}/` : ''
        }images`,
        (data) => dispatch({ type: 'SET_INITIAL', payload: data })
    );
    const [state, dispatch] = useReducer(reducer, initialState);

    if (isLoading) return <Loader />;

    if (error) return <Error err={error} link />;

    if (!state.allTypes.length)
        return (
            <Error title='images were not found' link={{ title: `back to ${label}`, path: '..' }} />
        );

    return (
        <>
            <Title margin='4rem 0'>
                image <span>gallery</span>
            </Title>
            {state.allTypes.length > 1 && <ImagesFilter {...state} dispatch={dispatch} />}
            <ImageGallery items={state.images[state.type]} imgSizes={tmdbImgSizes[state.type]} />
            <Button margin='4rem 0 0' as={Link} to='..'>
                back to {label}
            </Button>
        </>
    );
};

export default Images;
