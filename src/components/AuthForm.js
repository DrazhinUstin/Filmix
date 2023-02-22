import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';
import { Title, FormField, Button, TextButton } from '../components';
import styled from 'styled-components';

const AuthForm = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({ displayName: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const { displayName, email, password } = values;
            if (isSignUp) {
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(user, { displayName });
                navigate('/profile');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

    return (
        <Wrapper onSubmit={handleSubmit}>
            <Title fontSize='1.5rem' margin='0'>
                {isSignUp ? 'sign up' : 'sign in'}
            </Title>
            {isSignUp && (
                <FormField
                    name='displayName'
                    value={values.displayName}
                    onChange={handleChange}
                    disabled={isLoading}
                    required
                    labelText='username'
                />
            )}
            <FormField
                type='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                disabled={isLoading}
                required
            />
            <FormField
                type='password'
                name='password'
                value={values.password}
                onChange={handleChange}
                disabled={isLoading}
                required
            />
            <Button type='submit' disabled={isLoading} margin='0.5rem 0 0'>
                submit
            </Button>
            {!isSignUp && (
                <p className='form-message'>
                    <TextButton as={Link} to='/reset_password'>
                        forgot password?
                    </TextButton>
                </p>
            )}
            <p className='form-message'>
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <TextButton onClick={() => setIsSignUp(!isSignUp)}>
                    {isSignUp ? 'sign in' : 'sign up'}
                </TextButton>
            </p>
            {error && <p className='form-error'>{error.message}</p>}
        </Wrapper>
    );
};

export default AuthForm;

const Wrapper = styled.form`
    max-width: 400px;
    width: 90vw;
    display: grid;
    gap: 1rem;
    padding: 2rem 1rem;
    border-radius: var(--radius);
    background-color: var(--clr-light-black);
`;
