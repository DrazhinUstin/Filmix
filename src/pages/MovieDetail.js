import { useParams, useOutletContext, Link } from 'react-router-dom';
import {
    Title,
    AltTitle,
    GridList,
    Rating,
    LongParagraph,
    TopCredits,
    Button,
    AddToWatchlist,
    ScrollRow,
} from '../components';
import { useGlobalContext } from '../contexts/GlobalContext';
import { formatRuntime, formatToCurrency } from '../utils/helpers';
import defaultPoster from '../assets/images/default_poster.jpg';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

const MovieDetail = () => {
    const { id } = useParams();
    const movie = useOutletContext();
    const { user } = useGlobalContext();
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
        <>
            <Title>{title}</Title>
            <Wrapper>
                <img
                    src={
                        poster_path
                            ? `https://image.tmdb.org/t/p/w780${poster_path}`
                            : defaultPoster
                    }
                    alt={title}
                />
                <GridList>
                    <li>
                        Year: <span>{release_date.split('-')[0]}</span>
                    </li>
                    {countries.length > 0 && (
                        <li>
                            Country:{' '}
                            <span>{countries.map(({ iso_3166_1 }) => iso_3166_1).join(', ')}</span>
                        </li>
                    )}
                    {tagline && (
                        <li>
                            Tagline: <span>«{tagline}»</span>
                        </li>
                    )}
                    {genres.length > 0 && (
                        <li>
                            Genres: <span>{genres.map(({ name }) => name).join(', ')}</span>
                        </li>
                    )}
                    {runtime > 0 && (
                        <li>
                            Runtime: <span>{formatRuntime(runtime)}</span>
                        </li>
                    )}
                    {budget > 0 && (
                        <li>
                            Budget: <span>{formatToCurrency(budget)}</span>
                        </li>
                    )}
                    {revenue > 0 && (
                        <li>
                            Revenue: <span>{formatToCurrency(revenue)}</span>
                        </li>
                    )}
                </GridList>
            </Wrapper>
            <Rating data={{ uid: user?.uid, ...movie }} />
            {overview && (
                <article className='section-sm'>
                    <AltTitle>Storyline:</AltTitle>
                    <LongParagraph str={overview} fontSize='1.2rem' />
                </article>
            )}
            <TopCredits url={`/movie/${id}/credits`} />
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
        </>
    );
};

export default MovieDetail;

const Wrapper = styled.article`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
    gap: 2rem;
    @media ${breakpoints.md} {
        grid-template-columns: unset;
    }
    img {
        max-width: 600px;
        width: 100%;
        border: 1px solid var(--clr-gray);
    }
`;
