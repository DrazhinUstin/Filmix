import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext';
import AuthForm from '../components/AuthForm';
import styled from 'styled-components/macro';

const Auth = () => {
    const { user } = useGlobalContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.displayName) navigate('/profile');
    }, [user, navigate]);

    return (
        <main
            css={`
                height: 100vh;
                display: grid;
                place-items: center;
            `}
        >
            <AuthForm />
        </main>
    );
};

export default Auth;
