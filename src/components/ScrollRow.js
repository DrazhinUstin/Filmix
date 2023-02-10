import useFetch from '../hooks/useFetch';
import { Loader, Error, Title, HorizontalMenu } from './';

const ScrollRow = ({ title, url }) => {
    const { isLoading, error, data } = useFetch(url);

    if (isLoading) return <Loader />;

    if (error) return <Error title={`failed to fetch ${url}`} msg={error.message} />;

    const items = data.results || data.parts;
    return (
        items.length > 0 && (
            <section className='section section-center'>
                {title && <Title>{title}</Title>}
                <HorizontalMenu items={data.results || data.parts} />
            </section>
        )
    );
};

export default ScrollRow;
