import { useState } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import {
    AltTitle,
    LongParagraph,
    MovieTopCast,
    Sort,
    EpisodeCard,
    Pagination,
} from '../components';
import { sortOptions } from '../utils/localData';
import { dynamicSort } from '../utils/helpers';

const TVSeasonDetail = ({ episodesPerPage = 10 }) => {
    const { id, season_number } = useParams();
    const { overview, episodes } = useOutletContext();
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
            <MovieTopCast url={`/tv/${id}/season/${season_number}/aggregate_credits`} />
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
                            <EpisodeCard key={index} item={{ ...item, id }} />
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
