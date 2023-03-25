import { useOutletContext, Link } from 'react-router-dom';
import { Title, AltTitle, LongParagraph, Button, PersonCredits } from '../components';
import default_poster from '../assets/images/default_poster.jpg';
import { formatDate } from '../utils/helpers';
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
                <ul>
                    {birthday && (
                        <li>
                            birthday: <span>{formatDate(birthday)}</span>
                        </li>
                    )}
                    {place_of_birth && (
                        <li>
                            place of birth: <span>{place_of_birth}</span>
                        </li>
                    )}
                    {deathday && (
                        <li>
                            deathday: <span>{formatDate(deathday)}</span>
                        </li>
                    )}
                    <li>
                        department: <span>{known_for_department}</span>
                    </li>
                </ul>
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
    ul {
        display: grid;
        gap: 1rem;
        li {
            display: grid;
            grid-template-columns: 10rem 1fr;
            text-transform: capitalize;
            font-size: 1.2rem;
            font-weight: 500;
            span {
                color: var(--clr-gray);
                font-weight: normal;
            }
        }
    }
`;
