import { useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';
import { Title, FormField, Button, TextButton } from '../components';
import styled from 'styled-components';

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({ displayName: '', email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const { displayName, email, password } = values;
            if (isSignUp) {
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(user, { displayName });
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
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <Title fontSize='1.5rem' margin='0'>
                    {isSignUp ? 'sign up' : 'sign in'}
                </Title>
                {isSignUp && (
                    <FormField
                        name='displayName'
                        value={values.displayName}
                        onChange={handleChange}
                        required
                        labelText='username'
                    />
                )}
                <FormField
                    type='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    required
                />
                <FormField
                    type='password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    required
                />
                <Button type='submit' disabled={isLoading} margin='0.5rem 0 0'>
                    submit
                </Button>
                <p className='form-message'>
                    {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                    <TextButton onClick={() => setIsSignUp(!isSignUp)}>
                        {isSignUp ? 'sign in' : 'sign up'}
                    </TextButton>
                </p>
                {error && <p className='form-error'>{error.message}</p>}
            </form>
        </Wrapper>
    );
};

export default Auth;

const Wrapper = styled.main`
    height: 100vh;
    display: grid;
    place-items: center;
    form {
        max-width: 400px;
        width: 90vw;
        display: grid;
        gap: 1rem;
        padding: 2rem 1rem;
        border-radius: var(--radius);
        background-color: var(--clr-light-black);
        .form-message {
            text-align: center;
        }
        .form-error {
            color: var(--clr-red);
            text-align: center;
        }
    }
`;
