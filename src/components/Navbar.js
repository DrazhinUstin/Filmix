import { useState, useEffect, useRef } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaUserCheck, FaUserPlus, FaSearch } from 'react-icons/fa';
import { useGlobalContext } from '../contexts/GlobalContext';
import { navbarLinks } from '../utils/localData';
import logo from '../assets/images/logo.png';
import { breakpoints } from '../GlobalStyles';
import styled, { css } from 'styled-components/macro';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navbarRef = useRef(null);
    const { user, dispatch } = useGlobalContext();

    useEffect(() => {
        if (isMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        navbarRef.current.querySelectorAll('.menu a').forEach((elem, i) => {
            if (isMenuOpen) elem.style.animation = `appear 0.4s ease ${0.4 + i / 5}s forwards`;
            else elem.style.animation = '';
        });
        const handleScroll = () => {
            if (window.pageYOffset > navbarRef.current.offsetHeight) setIsScrolled(true);
            else setIsScrolled(false);
        };
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, [isMenuOpen]);

    return (
        <Wrapper
            ref={navbarRef}
            isScrolled={isScrolled}
            className={isMenuOpen ? 'menu-open' : null}
        >
            <div className='section-center'>
                <button className='menu-toggle-btn' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span></span>
                </button>
                <Link to='/' onClick={() => setIsMenuOpen(false)}>
                    <img src={logo} alt='logo' />
                </Link>
                <ul className='menu'>
                    {navbarLinks.map(({ id, path, title, isAuthRequired }) => {
                        if (!user && isAuthRequired) return null;
                        return (
                            <li key={id}>
                                <NavLink
                                    to={path}
                                    className={({ isActive }) => (isActive ? 'active' : null)}
                                    onClick={() => setIsMenuOpen(false)}
                                    end
                                >
                                    {title}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
                <div
                    css={`
                        display: flex;
                        gap: 1rem;
                    `}
                >
                    <Link className='btn' to='/profile' onClick={() => setIsMenuOpen(false)}>
                        {user ? <FaUserCheck /> : <FaUserPlus />}
                    </Link>
                    <button onClick={() => dispatch({ type: 'TOGGLE_SEARCH' })}>
                        <FaSearch />
                    </button>
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;

const Wrapper = styled.nav`
    position: sticky;
    top: 0;
    width: 100%;
    height: var(--navbar-height);
    z-index: 999;
    transition: var(--trans-ease);
    ${({ isScrolled }) =>
        isScrolled &&
        css`
            background-color: var(--clr-light-black);
            box-shadow: 0 5px 10px rgba(var(--clr-rgb-black), 0.5);
        `}
    .section-center {
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    img[alt='logo'] {
        width: 152px;
        height: 43px;
    }
    .menu {
        display: flex;
        column-gap: 2rem;
        a {
            position: relative;
            display: inline-block;
            color: var(--clr-white);
            font-size: 1.2rem;
            text-transform: capitalize;
            &.active {
                &::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background-color: var(--clr-green);
                }
            }
        }
        @media ${breakpoints.md} {
            position: fixed;
            top: var(--navbar-height);
            left: 0;
            right: 0;
            bottom: 0;
            transform: translateX(-100%);
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
            border-top: 1px solid var(--clr-green);
            background-color: var(--clr-light-black);
            transition: var(--trans-ease);
            transition-property: transform;
            a {
                opacity: 0;
                font-size: 1.5rem;
            }
        }
    }
    button,
    .btn {
        display: block;
        border: none;
        background-color: transparent;
        color: var(--clr-white);
        font-size: 1.2rem;
    }
    .menu-toggle-btn {
        position: relative;
        width: 1.5rem;
        height: 1rem;
        display: none;
        place-items: center;
        @media ${breakpoints.md} {
            display: grid;
        }
        span {
            width: 100%;
            height: 2px;
            background-color: var(--clr-white);
            transition: var(--trans-ease);
            &::before,
            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: inherit;
                height: inherit;
                background-color: var(--clr-white);
                transition: var(--trans-ease);
            }
            &::after {
                top: unset;
                bottom: 0;
            }
        }
    }
    &.menu-open {
        background-color: var(--clr-light-black);
        .menu {
            transform: translateX(0);
        }
        .menu-toggle-btn span {
            background-color: rgba(var(--clr-rgb-white), 0);
            &::before {
                top: 50%;
                transform: translateY(-50%) rotate(315deg);
            }
            &::after {
                bottom: 50%;
                transform: translateY(50%) rotate(-315deg);
            }
        }
    }
`;
