import { useState } from 'react';
import { Pagination, ImageViewer } from './';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

const ImageGallery = ({ items, itemsPerPage = 20 }) => {
    const [itemsOffset, setItemsOffset] = useState(0);
    const currentItems = items.slice(itemsOffset, itemsOffset + itemsPerPage);
    const [index, setIndex] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    return (
        <Wrapper>
            <p className='total'>
                total: <span>{items.length}</span>
            </p>
            <div className='images'>
                {currentItems.map(({ file_path }, i) => (
                    <img
                        key={i}
                        src={`https://image.tmdb.org/t/p/w300${file_path}`}
                        alt='backdrop'
                        onClick={() => {
                            setIndex(itemsOffset + i);
                            setIsViewerOpen(true);
                        }}
                    />
                ))}
            </div>
            {items.length > itemsPerPage && (
                <Pagination
                    pageCount={Math.ceil(items.length / itemsPerPage)}
                    handlePageClick={(e) => setItemsOffset(e.selected * itemsPerPage)}
                />
            )}
            {isViewerOpen && (
                <ImageViewer items={items} index={index} setIsViewerOpen={setIsViewerOpen} />
            )}
        </Wrapper>
    );
};

export default ImageGallery;

const Wrapper = styled.section`
    .total {
        margin-bottom: 1rem;
        text-align: right;
        font-size: 1.2rem;
        text-transform: capitalize;
        span {
            color: var(--clr-green);
        }
    }
    .images {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
        gap: 1rem;
        @media ${breakpoints.sm} {
            grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
        }
        img {
            width: 100%;
            transition: var(--trans-ease);
            cursor: pointer;
            &:hover {
                transform: scale(1.05);
            }
        }
    }
`;
