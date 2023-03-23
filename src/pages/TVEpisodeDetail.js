import { useParams, useOutletContext } from 'react-router-dom';
import { TVEpisodeNavigator, Title, AltTitle, LongParagraph, MovieTopCast } from '../components';
import { formatDate, formatRuntime } from '../utils/helpers';
import default_poster from '../assets/images/default_poster.jpg';
import { breakpoints } from '../GlobalStyles';
import styled, { css } from 'styled-components';

const TVEpisodeDetail = () => {
    const { id, season_number, episode_number } = useParams();
    const {
        episodeData: {
            name,
            still_path,
            episode_number: episode,
            season_number: season,
            air_date,
            runtime,
            overview,
        },
    } = useOutletContext();
    return (
        <>
            <TVEpisodeNavigator />
            <Title margin='2rem 0 4rem'>{name}</Title>
            <Wrapper isStillExist={!!still_path}>
                <img
                    src={
                        still_path
                            ? `http://image.tmdb.org/t/p/original${still_path}`
                            : default_poster
                    }
                    alt={name}
                />
                <ul>
                    <li>
                        Episode №: <span>{episode}</span>
                    </li>
                    <li>
                        Season №: <span>{season}</span>
                    </li>
                    {air_date && (
                        <li>
                            Air date: <span>{formatDate(air_date)}</span>
                        </li>
                    )}
                    {runtime && (
                        <li>
                            Runtime: <span>{formatRuntime(runtime)}</span>
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
            <MovieTopCast
                url={`/tv/${id}/season/${season_number}/episode/${episode_number}/credits`}
            />
        </>
    );
};

export default TVEpisodeDetail;

const Wrapper = styled.article`
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: flex-start;
    gap: 2rem;
    @media ${breakpoints.sm} {
        grid-template-columns: unset;
    }
    img {
        width: 100%;
        border: 1px solid var(--clr-gray);
        ${(props) =>
            !props.isStillExist &&
            css`
                max-height: 400px;
                object-fit: cover;
            `}
    }
    ul {
        display: grid;
        gap: 1rem;
        li {
            display: grid;
            grid-template-columns: 8rem 1fr;
            font-size: 1.2rem;
            span {
                color: var(--clr-gray);
            }
        }
    }
`;
