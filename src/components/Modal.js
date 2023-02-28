import { Button, RedButton } from './';
import styled from 'styled-components';

const Modal = ({ title, callback, closeModal }) => {
    return (
        <Wrapper>
            <article>
                <p>{title || 'Are you confirm your actions?'}</p>
                <div className='btns'>
                    <RedButton
                        onClick={() => {
                            callback();
                            closeModal();
                        }}
                        $withBorder
                    >
                        submit
                    </RedButton>
                    <Button onClick={closeModal} $withBorder>
                        exit
                    </Button>
                </div>
            </article>
        </Wrapper>
    );
};

export default Modal;

const Wrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    place-items: center;
    background-color: rgba(var(--clr-rgb-black), 0.7);
    z-index: 999;
    article {
        max-width: 450px;
        width: 90vw;
        padding: 2rem 1rem;
        border-radius: var(--radius);
        background-color: var(--clr-light-black);
        text-align: center;
        p {
            margin-bottom: 1rem;
            font-size: 1.2rem;
        }
    }
    .btns {
        display: flex;
        justify-content: center;
        gap: 1rem;
        button {
            min-width: 7rem;
        }
    }
`;
