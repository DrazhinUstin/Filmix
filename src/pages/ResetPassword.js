import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { Title, FormField, Button, TextButton } from '../components';
import styled from 'styled-components';

const ResetPassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setSuccess(null);
        setError(null);
        try {
            const email = e.currentTarget.elements[0].value;
            await sendPasswordResetEmail(auth, email);
            setSuccess({ message: 'Instructions were sent! Check your email.' });
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>
                <Title fontSize='1.5rem' margin='0'>
                    forgot your password?
                </Title>
                <p className='form-message'>
                    Enter your email address and we will send you instructions to reset your
                    password.
                </p>
                <FormField type='email' name='email' disabled={isLoading} required />
                <Button type='submit' disabled={isLoading} margin='0.5rem 0 0'>
                    submit
                </Button>
                {success && <p className='form-success'>{success.message}</p>}
                {error && <p className='form-error'>{error.message}</p>}
                <p className='form-message'>
                    Back to{' '}
                    <TextButton as={Link} to='/auth'>
                        auth page
                    </TextButton>
                </p>
            </form>
        </Wrapper>
    );
};

export default ResetPassword;

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
    }
`;
