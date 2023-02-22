import { NavLink, Outlet } from 'react-router-dom';
import { profilePageLinks } from '../utils/localData';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

const ProfileLayout = () => {
    return (
        <Wrapper className='main'>
            <aside className='sidebar'>
                {profilePageLinks.map(({ id, path, title }) => (
                    <NavLink key={id} to={path} end>
                        {title}
                    </NavLink>
                ))}
            </aside>
            <section className='detail'>
                <Outlet />
            </section>
        </Wrapper>
    );
};

export default ProfileLayout;

const Wrapper = styled.main`
    display: grid;
    grid-template-columns: 200px 1fr;
    align-items: flex-start;
    gap: 2rem;
    .sidebar {
        border-radius: var(--radius);
        overflow-y: auto;
        background-color: var(--clr-light-black);
        a {
            display: block;
            padding: 0.5rem 1rem;
            color: var(--clr-white);
            font-size: 1.2rem;
            font-weight: 500;
            text-transform: capitalize;
            &.active {
                background-color: var(--clr-green);
            }
        }
    }
    .detail {
        padding: 2rem 1rem;
        border-radius: var(--radius);
        background-color: var(--clr-light-black);
    }
    @media ${breakpoints.sm} {
        grid-template-columns: unset;
        .sidebar {
            display: flex;
            a {
                flex-shrink: 0;
                padding: 0.5rem;
                font-size: 1rem;
            }
        }
    }
`;
