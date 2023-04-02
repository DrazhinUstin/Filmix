import { useOutletContext, Link } from 'react-router-dom';
import { Title, AltTitle, GridList, LongParagraph, Button, PersonCredits } from '../components';
import default_poster from '../assets/images/default_poster.jpg';
import { formatDate, calcPersonAge } from '../utils/helpers';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

const PersonDetail = () => {
    const {
        name,
        birthday,
        place_of_birth,
        deathday,
        known_for_department,
        biography,
        profile_path,
    } = useOutletContext();
    return (
        <>
            <Title>{name}</Title>
            <Wrapper>
                <img
                    src={
                        profile_path
                            ? `https://image.tmdb.org/t/p/h632${profile_path}`
                            : default_poster
                    }
                    alt={name}
                />
                <GridList>
                    {birthday && (
                        <li>
                            Birthday: <span>{formatDate(birthday)}</span>
                        </li>
                    )}
                    {place_of_birth && (
                        <li>
                            Place of birth: <span>{place_of_birth}</span>
                        </li>
                    )}
                    {deathday && (
                        <li>
                            Deathday: <span>{formatDate(deathday)}</span>
                        </li>
                    )}
                    {birthday && (
                        <li>
                            Age: <span>{calcPersonAge(birthday, deathday)}</span>
                        </li>
                    )}
                    <li>
                        Department: <span>{known_for_department}</span>
                    </li>
                </GridList>
            </Wrapper>
            {biography && (
                <article className='section-sm'>
                    <AltTitle>biography:</AltTitle>
                    <LongParagraph str={biography} fontSize='1.2rem' />
                </article>
            )}
            <section className='section-sm'>
                <AltTitle>media:</AltTitle>
                <Button as={Link} to='images'>
                    open gallery
                </Button>
            </section>
            <PersonCredits />
        </>
    );
};

export default PersonDetail;

const Wrapper = styled.article`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: flex-start;
    gap: 2rem;
    @media ${breakpoints.md} {
        grid-template-columns: unset;
    }
    img {
        max-width: 100%;
        max-height: 632px;
    }
`;
