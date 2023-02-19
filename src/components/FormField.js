import styled from 'styled-components';

const FormField = ({ type = 'text', name, value, onChange, disabled, required, labelText }) => {
    return (
        <Wrapper>
            <label htmlFor={name}>{labelText || name}</label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
            />
        </Wrapper>
    );
};

export default FormField;

const Wrapper = styled.div`
    label {
        display: block;
        margin-bottom: 0.5rem;
        text-transform: capitalize;
    }
    input {
        width: 100%;
        padding: 0.5rem;
        outline: none;
        border: none;
        border-radius: var(--radius);
        background-color: var(--clr-white);
        color: var(--clr-black);
        font-family: var(--font);
        font-size: 1rem;
        &:focus {
            box-shadow: 0 0 0 2px var(--clr-green);
        }
    }
`;
