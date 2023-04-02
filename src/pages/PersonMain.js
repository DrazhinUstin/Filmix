import { useParams, useMatch, Link, Outlet } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import useFetch from '../hooks/useFetch';
import { Loader, Error, MainPageRow, TextButton } from '../components';
import default_poster from '../assets/images/default_poster.jpg';

const PersonMain = () => {
    const { id } = useParams();
    const { isLoading, error, data } = useFetch(`/person/${id}`);
    const match = useMatch('people/:id');

    if (isLoading) return <Loader fullScreen />;

    if (error) return <Error err={error} link fullScreen />;

    const { name, birthday, profile_path } = data;
    return (
        <main className='main'>
            {!match && (
                <MainPageRow>
                    <Link to='.'>
                        <img
                            src={
                                profile_path
                                    ? `https://image.tmdb.org/t/p/w185${profile_path}`
                                    : default_poster
                            }
                            alt={name}
                        />
                    </Link>
                    <div>
                        <h2>
                            <Link to='.'>{name}</Link>
                        </h2>
                        {birthday && <h3>{birthday.split('-')[0]}</h3>}
                        <TextButton as={Link} to='.' className='btn'>
                            <FaArrowLeft /> back to main
                        </TextButton>
                    </div>
                </MainPageRow>
            )}
            <Outlet context={data} />
        </main>
    );
};

export default PersonMain;
