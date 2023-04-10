import { useState } from 'react';
import { useParams, useOutletContext, Link } from 'react-router-dom';
import {
    AltTitle,
    LongParagraph,
    Button,
    TopCredits,
    Sort,
    TVEpisodeCard,
    Pagination,
} from '../components';
import { sortOptions } from '../utils/localData';
import { dynamicSort } from '../utils/helpers';

const TVSeasonDetail = ({ episodesPerPage = 10 }) => {
    const { id } = useParams();
    const { overview, season_number, episodes } = useOutletContext();
    const [sort, setSort] = useState(sortOptions.episodes[0].value);
    const [offset, setOffset] = useState(0);
    return (
        <>
            {overview && (
                <article className='section-sm'>
                    <AltTitle>storyline:</AltTitle>
                    <LongParagraph str={overview} fontSize='1.2rem' />
                </article>
            )}
            <section className='section-sm'>
                <AltTitle>media:</AltTitle>
                <Button as={Link} to='videos'>
                    open gallery
                </Button>
            </section>
            <TopCredits url={`/tv/${id}/season/${season_number}/aggregate_credits`} />
            {episodes.length > 0 && (
                <section className='section-sm'>
                    <AltTitle>episodes ({episodes.length}):</AltTitle>
                    <Sort
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        options={sortOptions.episodes}
                    />
                    {[...episodes]
                        .sort(dynamicSort(sort))
                        .slice(offset, offset + episodesPerPage)
                        .map((item, index) => (
                            <TVEpisodeCard key={index} item={{ ...item, id }} />
                        ))}
                    {episodes.length > episodesPerPage && (
                        <Pagination
                            pageCount={Math.ceil(episodes.length / episodesPerPage)}
                            handlePageClick={(e) => setOffset(e.selected * episodesPerPage)}
                            marginTop='2rem'
                        />
                    )}
                </section>
            )}
        </>
    );
};

export default TVSeasonDetail;
