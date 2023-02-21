import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { useGlobalContext } from '../contexts/GlobalContext';
import { Title, FormField, Button } from '../components';
import styled from 'styled-components';

const UpdateEmail = () => {
    const { user } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({ email: user.email, password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const { email, password } = values;
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(auth.currentUser, credential);
            await updateEmail(auth.currentUser, email);
            navigate('/profile');
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value });

    return (
        <Wrapper onSubmit={handleSubmit}>
            <Title margin='0'>update email</Title>
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
            {error && <p className='form-error'>{error.message}</p>}
        </Wrapper>
    );
};

export default UpdateEmail;

const Wrapper = styled.form`
    max-width: 600px;
    display: grid;
    gap: 1rem;
    margin: 0 auto;
    .form-error {
        color: var(--clr-red);
        text-align: center;
    }
`;
