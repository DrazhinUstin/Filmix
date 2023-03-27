import { useState } from 'react';
import { useParams, useOutletContext, Link } from 'react-router-dom';
import { sortOptions } from '../utils/localData';
import { dynamicSort } from '../utils/helpers';
import { Error, Title, Sort, GridView, Pagination, Button } from '../components';

const TVSeasons = ({ itemsPerPage = 20 }) => {
    const { id } = useParams();
    const { seasons } = useOutletContext();
    const [sort, setSort] = useState(sortOptions.seasons[0].value);
    const [offset, setOffset] = useState(0);

    if (!seasons.length)
        return (
            <Error title='seasons were not found' link={{ title: 'back to TV show', path: '..' }} />
        );

    const currentItems = seasons
        .sort(dynamicSort(sort))
        .slice(offset, offset + itemsPerPage)
        .map((item) => ({ ...item, id }));
    return (
        <>
            <Title margin='4rem 0'>
                all <span>seasons</span>
            </Title>
            <Sort
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                options={sortOptions.seasons}
            />
            <GridView items={currentItems} />
            {seasons.length > itemsPerPage && (
                <Pagination
                    pageCount={Math.ceil(seasons.length / itemsPerPage)}
                    handlePageClick={(e) => setOffset(e.selected * itemsPerPage)}
                />
            )}
            <Button margin='4rem 0 0' as={Link} to='..'>
                back to TV show
            </Button>
        </>
    );
};

export default TVSeasons;
