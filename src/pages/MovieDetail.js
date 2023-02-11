import { useParams, Link } from 'react-router-dom';
import { Loader, Error, Title, Button, ScrollRow } from '../components';
import useFetch from '../hooks/useFetch';
import { formatRuntime, formatToCurrency } from '../utils/helpers';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

const MovieDetail = () => {
    const { id } = useParams();
    const { isLoading, error, data: movie } = useFetch(`/movie/${id}`);

    if (isLoading) return <Loader fullScreen />;

    if (error) return <Error msg={error.message} fullScreen />;

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
        backdrop_path,
        belongs_to_collection: collection,
    } = movie;
    return (
        <Wrapper>
            <Title>{title}</Title>
            <article className='info'>
                <img
                    src={`https://image.tmdb.org/t/p/original/${poster_path || backdrop_path}`}
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
                    <li>
                        <span>runtime:</span> {formatRuntime(runtime)}
                    </li>
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
                <div className='extra-info'>
                    <h2>Storyline:</h2>
                    <p>{overview}</p>
                </div>
            )}
            <div className='extra-info'>
                <h2>movie images:</h2>
                <Button margin='1rem 0 0' as={Link} to='images'>
                    find images
                </Button>
            </div>
            {collection && <ScrollRow title='in collection' url={`/collection/${collection.id}`} />}
            <ScrollRow title='recommended movies' url={`/movie/${id}/recommendations`} />
            <ScrollRow title='similar movies' url={`/movie/${id}/similar`} />
        </Wrapper>
    );
};

export default MovieDetail;

const Wrapper = styled.main`
    max-width: var(--max-content-width);
    width: 90vw;
    margin: calc(var(--navbar-height) + 4rem) auto 4rem;
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
    .extra-info {
        margin-top: 2rem;
        font-size: 1.2rem;
        h2 {
            margin-bottom: 1rem;
            padding-left: 0.5rem;
            border-left: 3px solid var(--clr-green);
        }
    }
`;
