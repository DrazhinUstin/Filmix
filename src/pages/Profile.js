import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useGlobalContext } from '../contexts/GlobalContext';

const Profile = () => {
    const { user } = useGlobalContext();
    return (
        <main className='main'>
            <h1>this is a profile page</h1>
            <h3>{user.displayName}</h3>
            <h4>{user.email}</h4>
            <button onClick={() => signOut(auth)}>log out</button>
        </main>
    );
};

export default Profile;
