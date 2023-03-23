import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useGlobalContext } from '../contexts/GlobalContext';
import {
    Loader,
    Error,
    Title,
    AltTitle,
    LongParagraph,
    MovieTopCast,
    TVSeasonScrollRow,
    Button,
    AddToWatchlist,
    ScrollRow,
} from '../components';
import { formatDate, formatRuntime } from '../utils/helpers';
import default_poster from '../assets/images/default_poster.jpg';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

const TVShowDetail = () => {
    const { id } = useParams();
    const { isLoading, error, data } = useFetch(`/tv/${id}`);
    const { user } = useGlobalContext();

    if (isLoading) return <Loader fullScreen />;

    if (error) return <Error err={error} link fullScreen />;

    const {
        name,
        poster_path,
        first_air_date,
        last_air_date,
        next_episode_to_air: nextEpisode,
        origin_country: countries,
        tagline,
        genres,
        status,
        number_of_seasons,
        number_of_episodes,
        episode_run_time,
        overview,
        seasons,
    } = data;
    return (
        <main className='main'>
            <Title>{name}</Title>
            <Wrapper>
                <img
                    src={
                        poster_path
                            ? `http://image.tmdb.org/t/p/w780${poster_path}`
                            : default_poster
                    }
                    alt={name}
                />
                <ul>
                    {first_air_date && (
                        <li>
                            Year: <span>{first_air_date.split('-')[0]}</span>
                        </li>
                    )}
                    {countries.length > 0 && (
                        <li>
                            Country: <span>{countries.join(', ')}</span>
                        </li>
                    )}
                    {tagline && (
                        <li>
                            Tagline: <span>{tagline}</span>
                        </li>
                    )}
                    {genres.length > 0 && (
                        <li>
                            Genres: <span>{genres.map(({ name }) => name).join(', ')}</span>
                        </li>
                    )}
                    <li>
                        Status: <span>{status}</span>
                    </li>
                    {first_air_date && (
                        <li>
                            First air date: <span>{formatDate(first_air_date)}</span>
                        </li>
                    )}
                    {last_air_date && (
                        <li>
                            Last air date: <span>{formatDate(last_air_date)}</span>
                        </li>
                    )}
                    {nextEpisode?.air_date && (
                        <li>
                            Next air date: <span>{formatDate(nextEpisode.air_date)}</span>
                        </li>
                    )}
                    <li>
                        Seasons: <span>{number_of_seasons}</span>
                    </li>
                    <li>
                        Episodes: <span>{number_of_episodes}</span>
                    </li>
                    {episode_run_time.length > 0 && (
                        <li>
                            Episode runtime: <span>{formatRuntime(episode_run_time[0])}</span>
                        </li>
                    )}
                </ul>
            </Wrapper>
            {overview && (
                <article className='section-sm'>
                    <AltTitle>storyline:</AltTitle>
                    <LongParagraph str={overview} fontSize='1.2rem' />
                </article>
            )}
            <MovieTopCast url={`/tv/${id}/aggregate_credits`} />
            {seasons.length > 0 && <TVSeasonScrollRow id={id} seasons={seasons} />}
            <section className='section-sm'>
                <AltTitle>media:</AltTitle>
                <Button as={Link} to='images'>
                    open gallery
                </Button>
            </section>
            {user && <AddToWatchlist data={{ uid: user.uid, ...data }} />}
            <ScrollRow title='similar TV shows' url={`/tv/${id}/similar`} />
            <ScrollRow title='recommended TV shows' url={`/tv/${id}/recommendations`} />
        </main>
    );
};

export default TVShowDetail;

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
    ul {
        display: grid;
        gap: 1rem;
        font-size: 1.2rem;
        li {
            display: grid;
            grid-template-columns: 10rem 1fr;
            font-weight: 500;
            span {
                color: var(--clr-gray);
                font-weight: normal;
            }
        }
    }
`;
