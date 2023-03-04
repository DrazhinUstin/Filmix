import useFetch from '../hooks/useFetch';
import { Loader, Error, Title, AltTitle, HorizontalMenu } from './';

const ScrollRow = ({ title, altTitle, url, className = 'section section-center' }) => {
    const { isLoading, error, data } = useFetch(url);

    if (isLoading) return <Loader />;

    if (error) return <Error title={`failed to fetch ${url}`} err={error} />;

    const items = data.results || data.parts || data.cast;
    return (
        items.length > 0 && (
            <section className={className}>
                {title && <Title>{title}</Title>}
                {altTitle && <AltTitle>{altTitle}</AltTitle>}
                <HorizontalMenu items={items} />
            </section>
        )
    );
};

export default ScrollRow;
