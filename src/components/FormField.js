import styled from 'styled-components';

const FormField = ({
    type = 'text',
    name,
    value,
    onChange,
    disabled,
    required,
    placeholder,
    labelText,
    children,
}) => {
    return (
        <Wrapper>
            <label htmlFor={name}>{labelText || name}</label>
            {children ? (
                <select name={name} id={name} value={value} onChange={onChange} disabled={disabled}>
                    {children}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    required={required}
                    placeholder={placeholder}
                />
            )}
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
    input,
    select {
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
    select {
        padding: 0.5rem 0.25rem;
        border-radius: 0;
    }
`;
