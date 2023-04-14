import { useState, useEffect } from 'react';
import { Pagination, ImageViewer } from './';
import { breakpoints } from '../GlobalStyles';
import styled from 'styled-components';

const ImageGallery = ({ items, itemsPerPage = 20, imgSizes = { sm: 'w300', lg: 'w1280' } }) => {
    const [page, setPage] = useState(0);
    const [offset, setOffset] = useState(0);
    const currentItems = items.slice(offset, offset + itemsPerPage);
    const [index, setIndex] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    useEffect(() => {
        setPage(0);
        setOffset(0);
    }, [items]);

    return (
        <Wrapper>
            <p className='total'>
                total: <span>{items.length}</span>
            </p>
            <div className='images'>
                {currentItems.map(({ file_path }, i) => (
                    <img
                        key={i}
                        src={`https://image.tmdb.org/t/p/${imgSizes.sm}${file_path}`}
                        alt='backdrop'
                        onClick={() => {
                            setIndex(offset + i);
                            setIsViewerOpen(true);
                        }}
                    />
                ))}
            </div>
            {items.length > itemsPerPage && (
                <Pagination
                    pageCount={Math.ceil(items.length / itemsPerPage)}
                    handlePageClick={(e) => {
                        setPage(e.selected);
                        setOffset(e.selected * itemsPerPage);
                    }}
                    forcePage={page}
                />
            )}
            {isViewerOpen && (
                <ImageViewer
                    items={items}
                    index={index}
                    setIsViewerOpen={setIsViewerOpen}
                    imgSize={imgSizes.lg}
                />
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
