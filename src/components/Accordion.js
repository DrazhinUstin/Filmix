import { useRef, useEffect } from 'react';
import styled from 'styled-components';

const Accordion = ({ items = [] }) => {
    const elemRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            [...elemRef.current.children].forEach((el) => {
                if (!el.classList.contains('active')) return;
                el.lastElementChild.style.height =
                    el.lastElementChild.children[0].offsetHeight + 'px';
            });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleClick = (e) => {
        const elem = e.target.closest('li > header');
        if (!elem) return;
        const sibling = elem.nextElementSibling;
        const parent = elem.parentElement;
        parent.classList.toggle('active');
        sibling.style.height = sibling.children[0].offsetHeight + 'px';
        [...e.currentTarget.children].forEach((el) => {
            if (el === parent && parent.classList.contains('active')) return;
            el.classList.remove('active');
            el.lastElementChild.style.height = '';
        });
    };

    return (
        <Wrapper onClick={handleClick} ref={elemRef}>
            {items.map(({ id, title, content }) => {
                return (
                    <li key={id}>
                        <header>
                            <h4>{title}</h4>
                            <span></span>
                        </header>
                        <div className='content'>
                            <article>
                                <p>{content}</p>
                            </article>
                        </div>
                    </li>
                );
            })}
        </Wrapper>
    );
};

export default Accordion;

const Wrapper = styled.ul`
    display: grid;
    gap: 0.5rem;
    li {
        background-color: var(--clr-light-black);
        transition: var(--trans-ease);
        header {
            padding: 1rem 0.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            span {
                position: relative;
                flex: 0 0 1rem;
                height: 2px;
                background-color: var(--clr-green);
                transition: var(--trans-ease);
                &::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    transform: rotate(90deg);
                    width: 100%;
                    height: 100%;
                    background-color: inherit;
                    transition: var(--trans-ease);
                }
            }
        }
        .content {
            height: 0;
            overflow-y: hidden;
            transition: var(--trans-ease);
            article {
                position: relative;
                padding: 1rem 0.5rem;
                border-top: 1px solid var(--clr-light-black);
                &::after {
                    content: '';
                    position: absolute;
                    top: -1px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background-color: var(--clr-green);
                    transition: var(--trans-ease);
                }
            }
        }
        &.active {
            box-shadow: 0 0 0 1px var(--clr-green);
            header span {
                transform: rotate(360deg);
                &::after {
                    transform: rotate(360deg);
                }
            }
            article::after {
                width: 100%;
                left: unset;
                right: 0;
            }
        }
    }
`;
