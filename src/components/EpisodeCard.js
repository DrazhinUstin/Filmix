import { Link } from 'react-router-dom';
import { Button, LongParagraph } from './';
import { formatDate } from '../utils/helpers';
import default_poster from '../assets/images/default_poster.jpg';
import { breakpoints } from '../GlobalStyles';
import styled, { css } from 'styled-components';

const EpisodeCard = ({
    item: { id, name, air_date, still_path, overview, season_number, episode_number },
}) => {
    return (
        <Wrapper isStillExist={!!still_path}>
            <img
                src={still_path ? `https://image.tmdb.org/t/p/w300${still_path}` : default_poster}
                alt={name}
            />
            <div>
                <header>
                    <h4>
                        {episode_number}
                        {'. '}
                        {name}
                    </h4>
                    {air_date && <span>{formatDate(air_date)}</span>}
                </header>
                {overview && <LongParagraph str={overview} maxLength={75} />}
                <Button
                    margin='1rem 0 0'
                    as={Link}
                    to={`/tv/${id}/seasons/${season_number}/episode/${episode_number}`}
                >
                    details
                </Button>
            </div>
        </Wrapper>
    );
};

export default EpisodeCard;

const Wrapper = styled.article`
    display: grid;
    grid-template-columns: auto 1fr;
    border-radius: var(--radius);
    overflow: hidden;
    background-color: var(--clr-light-black);
    &:not(:last-child) {
        margin-bottom: 1rem;
    }
    & > div {
        padding: 1rem;
    }
    img {
        max-width: 300px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        ${(props) =>
            !props.isStillExist &&
            css`
                max-height: 200px;
            `}
    }
    header {
        display: flex;
        justify-content: space-between;
        column-gap: 0.5rem;
        h4 {
            letter-spacing: unset;
        }
        span {
            color: var(--clr-gray);
        }
    }
    p {
        margin-top: 0.5rem;
    }
    @media ${breakpoints.sm} {
        grid-template-columns: unset;
        text-align: center;
        img {
            max-width: unset;
            max-height: 200px;
        }
        header {
            flex-direction: column;
        }
    }
`;
