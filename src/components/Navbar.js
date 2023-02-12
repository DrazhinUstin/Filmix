import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useGlobalContext } from '../contexts/GlobalContext';
import { navbarLinks } from '../utils/localData';
import styled, { css } from 'styled-components';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const navbarRef = useRef(null);
    const { setIsSearchEnabled } = useGlobalContext();

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > navbarRef.current.offsetHeight) setIsScrolled(true);
            else setIsScrolled(false);
        };
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Wrapper ref={navbarRef} isScrolled={isScrolled}>
            <div className='section-center'>
                <h2>FILMIX</h2>
                <ul>
                    {navbarLinks.map(({ id, path, title }) => {
                        return (
                            <li key={id}>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) => (isActive ? 'active' : null)}
                                    end
                                >
                                    {title}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
                <div>
                    <button onClick={() => setIsSearchEnabled(true)}>
                        <FaSearch />
                    </button>
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;

const Wrapper = styled.nav`
    position: fixed;
    top: 0;
    width: 100%;
    height: var(--navbar-height);
    z-index: 999;
    ${({ isScrolled }) =>
        isScrolled &&
        css`
            background-color: var(--clr-light-black);
        `}
    .section-center {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    h2 {
        color: var(--clr-green);
        font-size: 2.5rem;
    }
    ul {
        display: flex;
        gap: 2rem;
        a {
            display: inline-block;
            color: var(--clr-white);
            font-size: 1.2rem;
            text-transform: capitalize;
            &.active {
                border-bottom: 3px solid var(--clr-green);
            }
        }
    }
    button {
        display: block;
        border: none;
        background-color: transparent;
        color: var(--clr-white);
        font-size: 1.2rem;
    }
`;
