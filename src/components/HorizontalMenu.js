import { useContext } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import usePreventBodyScroll from '../hooks/usePreventBodyScroll';
import MovieCard from './MovieCard';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';

const HorizontalMenu = ({ items }) => {
    const { disableScroll, enableScroll } = usePreventBodyScroll();

    return (
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
            <ScrollMenu onWheel={onWheel} Footer={Arrows}>
                {items.map((item) => {
                    return <MovieCard key={item.id} item={item} />;
                })}
            </ScrollMenu>
        </div>
    );
};

function onWheel(apiObj, ev) {
    const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

    if (isThouchpad) {
        ev.stopPropagation();
        return;
    }

    if (ev.deltaY < 0) apiObj.scrollNext();
    else if (ev.deltaY > 0) apiObj.scrollPrev();
}

const Arrows = () => {
    const { isFirstItemVisible, scrollPrev, isLastItemVisible, scrollNext } =
        useContext(VisibilityContext);
    return (
        <Wrapper>
            <button disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
                <FaChevronLeft />
            </button>
            <button disabled={isLastItemVisible} onClick={() => scrollNext()}>
                <FaChevronRight />
            </button>
        </Wrapper>
    );
};

const Wrapper = styled.footer`
    display: flex;
    justify-content: right;
    gap: 1rem;
    margin-top: 1rem;
    button {
        width: 2.5rem;
        height: 2.5rem;
        display: grid;
        place-items: center;
        border: 1px solid var(--clr-green);
        background-color: transparent;
        color: var(--clr-green);
        font-size: 1.5rem;
        &:disabled {
            border-color: var(--clr-gray);
            color: var(--clr-white);
        }
    }
`;

export default HorizontalMenu;
