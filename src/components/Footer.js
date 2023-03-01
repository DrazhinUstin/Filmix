import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { useGlobalContext } from '../contexts/GlobalContext';
import { navbarLinks } from '../utils/localData';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

const Footer = () => {
    const { user } = useGlobalContext();
    return (
        <Wrapper>
            <div className='section-center'>
                <p className='copyright'>
                    <a
                        href='https://github.com/DrazhinUstin/Filmix'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <FaGithub />
                    </a>
                    &#169; {new Date().getFullYear()} Filmix, Inc
                </p>
                <ul className='list'>
                    {navbarLinks.map(({ id, path, title }) => {
                        if (!user && title === 'watchlist') return null;
                        return (
                            <li key={id}>
                                <Link to={path}>{title}</Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </Wrapper>
    );
};

export default Footer;

const Wrapper = styled.footer`
    height: var(--footer-height);
    display: grid;
    place-items: center;
    border-top: 1px solid var(--clr-light-black);
    font-size: 0.9rem;
    .section-center {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        column-gap: 2rem;
        @media ${breakpoints.sm} {
            grid-template-columns: unset;
            row-gap: 0.375rem;
        }
    }
    .copyright {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;
        a {
            color: var(--clr-white);
            font-size: 1.5rem;
            &:hover {
                color: var(--clr-green);
            }
        }
    }
    .list {
        display: flex;
        justify-content: flex-end;
        column-gap: 2rem;
        @media ${breakpoints.sm} {
            justify-content: center;
            column-gap: 1rem;
        }
        a {
            display: inline-block;
            color: var(--clr-white);
            text-transform: capitalize;
            &:hover {
                color: var(--clr-green);
            }
        }
    }
`;
