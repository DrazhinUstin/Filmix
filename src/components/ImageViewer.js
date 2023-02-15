import { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';

const ImageViewer = ({ items, index, setIsViewerOpen }) => {
    const [step, setStep] = useState(index);
    const { file_path } = items[step];
    return (
        <Wrapper>
            <img src={`https://image.tmdb.org/t/p/w1280${file_path}`} alt='backdrop' />
            <div className='counter'>
                <button onClick={() => setIsViewerOpen(false)}>
                    <FaTimes />
                </button>
                <p>
                    <span>{step + 1}</span> of {items.length}
                </p>
            </div>
            <div className='controls'>
                <button disabled={step === 0} onClick={() => setStep(step - 1)}>
                    <FaChevronLeft />
                </button>
                <button disabled={step === items.length - 1} onClick={() => setStep(step + 1)}>
                    <FaChevronRight />
                </button>
            </div>
        </Wrapper>
    );
};

export default ImageViewer;

const Wrapper = styled.section`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
    background-color: rgba(var(--clr-rgb-black), 0.8);
    z-index: 999;
    .counter {
        position: absolute;
        top: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        font-size: 1.2rem;
        span {
            color: var(--clr-green);
        }
    }
    .controls {
        position: absolute;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 1rem;
    }
    img {
        position: absolute;
        max-width: 100%;
        max-height: 100%;
    }
    button {
        padding: 0.25rem;
        border: none;
        border-radius: var(--radius);
        background-color: rgba(var(--clr-rgb-black), 0.6);
        color: var(--clr-white);
        font-size: 1.5rem;
        &:disabled {
            visibility: hidden;
        }
    }
`;
