import { useState } from 'react';
import ReactPlayer from 'react-player/lazy';
import { formatDate, formatDuration } from '../utils/helpers';
import styled from 'styled-components';

const VideoCard = ({ item: { site, key, name, type, published_at: date } }) => {
    const [duration, setDuration] = useState(null);
    return (
        <Wrapper>
            <div className='player-wrapper'>
                <ReactPlayer
                    className='react-player'
                    width='100%'
                    height='100%'
                    url={
                        site === 'YouTube'
                            ? `https://www.youtube.com/watch?v=${key}`
                            : `https://vimeo.com/${key}`
                    }
                    light={true}
                    controls={true}
                    onDuration={(dur) => setDuration(dur)}
                />
            </div>
            <footer>
                <h4>{name}</h4>
                <p>
                    {type}
                    {duration && ` • ${formatDuration(duration)}`}
                    {date && ` • ${formatDate(date.slice(0, date.indexOf('T')))}`}
                </p>
            </footer>
        </Wrapper>
    );
};

export default VideoCard;

const Wrapper = styled.article`
    .player-wrapper {
        position: relative;
        padding-top: 56.25%;
    }
    .react-player {
        position: absolute;
        top: 0;
        left: 0;
    }
    footer {
        padding: 0.375rem;
        background-color: var(--clr-light-black);
        text-align: center;
        h4 {
            font-weight: 500;
            letter-spacing: unset;
        }
        p {
            color: var(--clr-gray);
        }
    }
`;
