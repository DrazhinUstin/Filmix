import { useParams, Link } from 'react-router-dom';
import {
    Loader,
    Error,
    Title,
    AltTitle,
    LongParagraph,
    MovieTopCast,
    Button,
    AddToWatchlist,
    ScrollRow,
} from '../components';
import useFetch from '../hooks/useFetch';
import { useGlobalContext } from '../contexts/GlobalContext';
import { formatRuntime, formatToCurrency } from '../utils/helpers';
import defaultPoster from '../assets/images/default_poster.jpg';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

const MovieDetail = () => {
    const { id } = useParams();
    const { isLoading, error, data: movie } = useFetch(`/movie/${id}`);
    const { user } = useGlobalContext();

    if (isLoading) return <Loader fullScreen />;

    if (error) return <Error err={error} link fullScreen />;

    const {
        title,
        overview,
        tagline,
        release_date,
        production_countries: countries,
        genres,
        budget,
        revenue,
        runtime,
        poster_path,
        belongs_to_collection: collection,
    } = movie;
    return (
        <Wrapper>
            <Title>{title}</Title>
            <article className='info'>
                <img
                    src={
                        poster_path
                            ? `https://image.tmdb.org/t/p/w780${poster_path}`
                            : defaultPoster
                    }
                    alt={title}
                />
                <ul>
                    <li>
                        <span>year:</span> {release_date.split('-')[0]}
                    </li>
                    <li>
                        <span>country:</span>{' '}
                        {countries.map(({ iso_3166_1 }) => iso_3166_1).join(', ')}
                    </li>
                    {tagline && (
                        <li>
                            <span>tagline:</span> «{tagline}»
                        </li>
                    )}
                    <li>
                        <span>genres:</span> {genres.map(({ name }) => name).join(', ')}
                    </li>
                    {runtime > 0 && (
                        <li>
                            <span>runtime:</span> {formatRuntime(runtime)}
                        </li>
                    )}
                    {budget > 0 && (
                        <li>
                            <span>budget:</span> {formatToCurrency(budget)}
                        </li>
                    )}
                    {revenue > 0 && (
                        <li>
                            <span>revenue:</span> {formatToCurrency(revenue)}
                        </li>
                    )}
                </ul>
            </article>
            {overview && (
                <article className='section-sm'>
                    <AltTitle>Storyline:</AltTitle>
                    <LongParagraph str={overview} fontSize='1.2rem' />
                </article>
            )}
            <MovieTopCast url={`/movie/${id}/credits`} />
            <div className='section-sm'>
                <AltTitle>media:</AltTitle>
                <Button as={Link} to='images'>
                    open gallery
                </Button>
            </div>
            {user && <AddToWatchlist data={{ uid: user.uid, ...movie }} />}
            {collection && <ScrollRow title='in collection' url={`/collection/${collection.id}`} />}
            <ScrollRow title='recommended movies' url={`/movie/${id}/recommendations`} />
            <ScrollRow title='similar movies' url={`/movie/${id}/similar`} />
        </Wrapper>
    );
};

export default MovieDetail;

const Wrapper = styled.main.attrs(() => ({ className: 'main' }))`
    & > .info {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        img {
            max-width: 600px;
            width: 100%;
            border: 1px solid var(--clr-gray);
        }
        li {
            display: grid;
            grid-template-columns: 10rem 1fr;
            font-size: 1.2rem;
            &:not(:last-child) {
                margin-bottom: 1rem;
            }
            span {
                font-weight: 500;
                text-transform: capitalize;
            }
            @media ${breakpoints.xsm} {
                grid-template-columns: 6rem 1fr;
            }
        }
        @media ${breakpoints.md} {
            grid-template-columns: unset;
        }
    }
`;
