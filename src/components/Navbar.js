import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { useGlobalContext } from '../contexts/GlobalContext';
import { navbarLinks } from '../utils/localData';
import { breakpoints } from '../GlobalStyles';
import styled, { css } from 'styled-components';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navbarRef = useRef(null);
    const { setIsSearchEnabled } = useGlobalContext();

    useEffect(() => {
        if (isMenuOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        navbarRef.current.querySelectorAll('.menu a').forEach((elem, i) => {
            if (isMenuOpen) elem.style.animation = `appear 0.4s ease ${0.4 + i / 4}s forwards`;
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
                <h2 className='logo'>FILMIX</h2>
                <ul className='menu'>
                    {navbarLinks.map(({ id, path, title }) => {
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
    transition: var(--trans-ease);
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
    .logo {
        color: var(--clr-green);
        font-size: 2.5rem;
    }
    .menu {
        display: flex;
        gap: 2rem;
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
    button {
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
