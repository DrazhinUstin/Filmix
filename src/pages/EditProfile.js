import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, storage } from '../firebase';
import { useGlobalContext } from '../contexts/GlobalContext';
import { Title, FormField, Button, RedButton } from '../components';
import { validateFile } from '../utils/helpers';
import styled from 'styled-components';

const EditProfile = () => {
    const { user } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [values, setValues] = useState({ displayName: user.displayName, file: '' });
    const navigate = useNavigate();
    const fileRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        try {
            const { displayName, file } = values;
            const profile = { displayName };
            if (file && validateFile(file)) {
                const storageRef = ref(storage, `users/${user.uid}`);
                await uploadBytes(storageRef, file);
                profile.photoURL = await getDownloadURL(storageRef);
            }
            await updateProfile(auth.currentUser, profile);
            navigate('/profile');
        } catch (error) {
            setError(error);
        }
        setIsLoading(false);
    };

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === 'file') value = e.target.files[0];
        setValues({ ...values, [name]: value });
    };

    return (
        <Wrapper onSubmit={handleSubmit}>
            <Title margin='0'>edit profile</Title>
            <FormField
                name='displayName'
                value={values.displayName}
                onChange={handleChange}
                disabled={isLoading}
                required
                labelText='username'
            />
            <input
                type='file'
                name='file'
                accept='.jpg, .jpeg, .png'
                style={{ display: 'none' }}
                ref={fileRef}
                onChange={handleChange}
            />
            <RedButton type='button' onClick={() => fileRef.current.click()} disabled={isLoading}>
                upload avatar
            </RedButton>
            <Button type='submit' disabled={isLoading}>
                submit
            </Button>
            {error && <p className='form-error'>{error.message}</p>}
        </Wrapper>
    );
};

export default EditProfile;

const Wrapper = styled.form`
    max-width: 600px;
    display: grid;
    gap: 2rem;
    margin: 0 auto;
    .form-error {
        color: var(--clr-red);
        text-align: center;
    }
`;
