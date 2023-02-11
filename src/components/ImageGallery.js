import { useState } from 'react';
import ImageViewer from './ImageViewer';
import styled from 'styled-components';

const ImageGallery = ({ items }) => {
    const [index, setIndex] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    return (
        <Wrapper>
            <p className='total'>
                total: <span>{items.length}</span>
            </p>
            <div className='images'>
                {items.map(({ file_path }, i) => (
                    <img
                        key={i}
                        src={`https://image.tmdb.org/t/p/original${file_path}`}
                        alt='backdrop'
                        onClick={() => {
                            setIndex(i);
                            setIsViewerOpen(true);
                        }}
                    />
                ))}
            </div>
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
        grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
        gap: 1rem;
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
