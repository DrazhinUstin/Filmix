import { useParams, useOutletContext, Link } from 'react-router-dom';
import {
    Title,
    AltTitle,
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
                <ul>
                    <li>
                        year: <span>{release_date.split('-')[0]}</span>
                    </li>
                    {countries.length > 0 && (
                        <li>
                            country:{' '}
                            <span>{countries.map(({ iso_3166_1 }) => iso_3166_1).join(', ')}</span>
                        </li>
                    )}
                    {tagline && (
                        <li>
                            tagline: <span>«{tagline}»</span>
                        </li>
                    )}
                    {genres.length > 0 && (
                        <li>
                            genres: <span>{genres.map(({ name }) => name).join(', ')}</span>
                        </li>
                    )}
                    {runtime > 0 && (
                        <li>
                            runtime: <span>{formatRuntime(runtime)}</span>
                        </li>
                    )}
                    {budget > 0 && (
                        <li>
                            budget: <span>{formatToCurrency(budget)}</span>
                        </li>
                    )}
                    {revenue > 0 && (
                        <li>
                            revenue: <span>{formatToCurrency(revenue)}</span>
                        </li>
                    )}
                </ul>
            </Wrapper>
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
        font-weight: 500;
        text-transform: capitalize;
        &:not(:last-child) {
            margin-bottom: 1rem;
        }
        span {
            color: var(--clr-gray);
            font-weight: normal;
        }
        @media ${breakpoints.xsm} {
            grid-template-columns: 6rem 1fr;
        }
    }
    @media ${breakpoints.md} {
        grid-template-columns: unset;
    }
`;
