import { useOutletContext, useNavigate } from 'react-router-dom';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import TextButton from './TextButton';
import styled from 'styled-components';

const TVEpisodeNavigator = ({ isLoading }) => {
    const {
        seasonData: { episodes },
        episodeData: { episode_number },
    } = useOutletContext();
    const navigate = useNavigate();

    const handleClick = (number) => {
        navigate(`../episode/${episode_number + number}`);
    };

    if (episodes.length <= 1) return null;

    return (
        <Wrapper
            className='section-sm'
            isOnlyNextBtn={episode_number === episodes[0].episode_number}
        >
            {episode_number !== episodes[0].episode_number && (
                <TextButton onClick={() => handleClick(-1)} disabled={isLoading}>
                    <FaLongArrowAltLeft />
                    prev episode
                </TextButton>
            )}
            {episode_number < episodes[episodes.length - 1].episode_number && (
                <TextButton onClick={() => handleClick(1)} disabled={isLoading}>
                    next episode
                    <FaLongArrowAltRight />
                </TextButton>
            )}
        </Wrapper>
    );
};

export default TVEpisodeNavigator;

const Wrapper = styled.section`
    display: flex;
    justify-content: ${({ isOnlyNextBtn }) => (isOnlyNextBtn ? 'flex-end' : 'space-between')};
    gap: 0.5rem;
    button {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
`;
