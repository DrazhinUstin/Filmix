import ReactPaginate from 'react-paginate';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';

const Pagination = ({ pageCount, handlePageClick, forcePage }) => {
    return (
        <Wrapper>
            <ReactPaginate
                pageCount={pageCount > 500 ? 500 : pageCount}
                onPageChange={handlePageClick}
                forcePage={forcePage}
                pageRangeDisplayed={3}
                marginPagesDisplayed={3}
                renderOnZeroPageCount={null}
                previousLabel={<FaChevronLeft />}
                nextLabel={<FaChevronRight />}
                breakLabel='...'
                containerClassName='pagination'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
            />
        </Wrapper>
    );
};

export default Pagination;

const Wrapper = styled.section`
    margin-top: 4rem;
    .pagination {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-end;
        align-items: center;
        gap: 1rem;
        & > * {
            flex-shrink: 0;
            cursor: pointer;
        }
    }
    .page-link {
        min-width: 2rem;
        height: 2rem;
        display: grid;
        place-items: center;
        border: 1px solid var(--clr-gray);
        border-radius: var(--radius);
        color: var(--clr-white);
    }
    .selected .page-link {
        border-color: var(--clr-green);
        background-color: var(--clr-green);
    }
    .previous,
    .next {
        color: var(--clr-green);
        font-size: 1.2rem;
        &.disabled {
            display: none;
        }
    }
`;
