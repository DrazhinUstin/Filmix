import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useGlobalContext } from '../contexts/GlobalContext';
import { Title, RedButton } from '../components';
import styled from 'styled-components';

const Profile = () => {
    const { user } = useGlobalContext();
    return (
        <Wrapper>
            <Title margin='0 0 2rem'>account info:</Title>
            {user.photoURL ? (
                <img className='avatar' src={user.photoURL} alt='avatar' />
            ) : (
                <span className='avatar'>{user.displayName[0].toUpperCase()}</span>
            )}
            <ul>
                <li>
                    username: <span>{user.displayName}</span>
                </li>
                <li>
                    email: <span>{user.email}</span>
                </li>
                <li>
                    created at: <span>{new Date(+user.metadata.createdAt).toLocaleString()}</span>
                </li>
            </ul>
            <RedButton onClick={() => signOut(auth)} $withBorder>
                sign out
            </RedButton>
        </Wrapper>
    );
};

export default Profile;

const Wrapper = styled.article`
    text-align: center;
    .avatar {
        width: 6rem;
        height: 6rem;
        object-fit: cover;
        margin: 0 auto;
        border-radius: 50%;
    }
    span.avatar {
        display: grid;
        place-items: center;
        background-color: var(--clr-green);
        font-size: 2.5rem;
        font-weight: 500;
    }
    ul {
        display: grid;
        justify-content: center;
        gap: 1rem;
        margin: 2rem 0;
        text-align: left;
        li {
            display: grid;
            grid-template-columns: 8rem auto;
            font-size: 1.2rem;
            text-transform: capitalize;
            span {
                text-transform: none;
                color: var(--clr-gray);
            }
        }
    }
`;
