import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Selector = ({ items = [], callback, isLoading }) => {
    const [index, setIndex] = useState(0);
    const anchorRef = useRef(null);

    useEffect(() => {
        const parent = anchorRef.current.parentElement;
        const elem = parent.children[index];
        const x = elem.getBoundingClientRect().left - parent.getBoundingClientRect().left;
        anchorRef.current.style.left = x + 'px';
        anchorRef.current.style.width = elem.offsetWidth + 'px';
    }, [index]);

    return (
        <Wrapper>
            {items.map((item, ind) => (
                <button
                    key={ind}
                    onClick={() => {
                        setIndex(ind);
                        callback && callback(ind);
                    }}
                    disabled={ind === index || isLoading}
                >
                    {item}
                </button>
            ))}
            <span className='anchor' ref={anchorRef}></span>
        </Wrapper>
    );
};

export default Selector;

const Wrapper = styled.div`
    position: relative;
    display: inline-flex;
    border-radius: calc(var(--radius) * 4);
    overflow: hidden;
    background-color: var(--clr-light-black);
    box-shadow: 0 0 0 1px var(--clr-green);
    button {
        flex-shrink: 0;
        padding: 0.375rem 1rem;
        border: none;
        background-color: transparent;
        color: var(--clr-white);
        font-family: var(--font);
        font-size: 1rem;
        line-height: 1.25;
        text-transform: capitalize;
        z-index: 1;
        &:disabled {
            opacity: 1;
        }
    }
    .anchor {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        border-radius: inherit;
        background-color: var(--clr-green);
        transition: var(--trans-ease);
        transition-duration: 0.25s;
    }
`;
