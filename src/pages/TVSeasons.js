import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { sortOptions } from '../utils/localData';
import { dynamicSort } from '../utils/helpers';
import { Loader, Error, Title, Sort, GridView, Pagination, Button } from '../components';

const TVSeasons = ({ itemsPerPage = 20 }) => {
    const { id } = useParams();
    const { isLoading, error, data } = useFetch(`/tv/${id}`);
    const [sort, setSort] = useState(sortOptions.seasons[0].value);
    const [offset, setOffset] = useState(0);

    if (isLoading) return <Loader fullScreen />;

    if (error) return <Error err={error} link fullScreen />;

    if (!data.seasons.length)
        return (
            <Error
                title='seasons were not found'
                link={{ title: 'back to TV show', path: '..' }}
                fullScreen
            />
        );

    const currentItems = data.seasons
        .sort(dynamicSort(sort))
        .slice(offset, offset + itemsPerPage)
        .map((item) => ({ ...item, id }));
    return (
        <main className='main'>
            <Title>
                TV show <span>seasons</span>
            </Title>
            <Sort
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                options={sortOptions.seasons}
            />
            <GridView items={currentItems} />
            {data.seasons.length > itemsPerPage && (
                <Pagination
                    pageCount={Math.ceil(data.seasons.length / itemsPerPage)}
                    handlePageClick={(e) => setOffset(e.selected * itemsPerPage)}
                />
            )}
            <Button margin='4rem 0 0' as={Link} to='..'>
                back to TV show
            </Button>
        </main>
    );
};

export default TVSeasons;
