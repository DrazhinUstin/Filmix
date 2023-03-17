import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { Loader, Error, Title, Selector, HorizontalMenu } from './';

const SelectableScrollRow = ({ title, data }) => {
    const [selected, setSelected] = useState(data[0]);
    const { isLoading, error, data: items } = useFetch(selected.url);

    if (error) return <Error title={`failed to fetch ${selected.url}`} err={error} />;

    return (
        <section className='section section-center'>
            {title && <Title margin='0 0 2rem'>{title}</Title>}
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                <Selector
                    items={data.map(({ name }) => name)}
                    callback={(i) => setSelected(data[i])}
                    isLoading={isLoading}
                />
            </div>
            {isLoading ? <Loader /> : <HorizontalMenu items={items.results} />}
        </section>
    );
};

export default SelectableScrollRow;
