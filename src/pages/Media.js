import { NavLink, Outlet } from 'react-router-dom';
import { AltTitle } from '../components';
import styled from 'styled-components';

const Media = () => {
    return (
        <>
            <Wrapper>
                <AltTitle margin='0'>media:</AltTitle>
                <nav>
                    <NavLink to='images'>images</NavLink>
                    <NavLink to='videos'>videos</NavLink>
                </nav>
            </Wrapper>
            <Outlet />
        </>
    );
};

export default Media;

const Wrapper = styled.section`
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 1rem;
    margin: 2rem auto;
    nav {
        display: flex;
        a {
            padding: 0.375rem 1rem;
            background-color: var(--clr-light-black);
            color: var(--clr-white);
            text-transform: capitalize;
            &:first-child {
                border-radius: var(--radius) 0 0 var(--radius);
            }
            &:last-child {
                border-radius: 0 var(--radius) var(--radius) 0;
            }
            &.active {
                background-color: var(--clr-green);
            }
        }
    }
`;
