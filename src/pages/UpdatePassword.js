import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Title, FormField, Button, TextButton } from '../components';
import styled from 'styled-components';

const UpdatePassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const formData = new FormData(e.currentTarget);
            const [oldPassword, newPassword] = formData.values();
            const credential = EmailAuthProvider.credential(auth.currentUser.email, oldPassword);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updatePassword(auth.currentUser, newPassword);
            setSuccess({ message: 'Password was successfully updated!' });
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    return (
        <Wrapper onSubmit={handleSubmit}>
            <Title margin='0'>update password</Title>
            <FormField
                type='password'
                name='oldPassword'
                disabled={isLoading}
                required
                labelText='old password'
            />
            <FormField
                type='password'
                name='newPassword'
                disabled={isLoading}
                required
                labelText='new password'
            />
            <Button type='submit' disabled={isLoading} margin='0.5rem 0 0'>
                submit
            </Button>
            <p className='form-message'>
                Forgot password?{' '}
                <TextButton as={Link} to='/reset_password'>
                    click
                </TextButton>{' '}
                here to reset it.
            </p>
            {success && <p className='form-success'>{success.message}</p>}
            {error && <p className='form-error'>{error.message}</p>}
        </Wrapper>
    );
};

export default UpdatePassword;

const Wrapper = styled.form`
    max-width: 600px;
    display: grid;
    gap: 1rem;
    margin: 0 auto;
    .form-message {
        text-align: center;
    }
    .form-success {
        color: var(--clr-green);
        text-align: center;
    }
    .form-error {
        color: var(--clr-red);
        text-align: center;
    }
`;
