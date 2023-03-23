import { Link } from 'react-router-dom';
import { AltTitle, TextButton, HorizontalMenu } from './';

const TVSeasonScrollRow = ({ id, seasons, itemsInRow = 20 }) => {
    return (
        <section className='section-sm'>
            <AltTitle margin='0 0 1rem'>seasons:</AltTitle>
            <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
                <TextButton as={Link} to='seasons'>
                    all seasons
                </TextButton>
            </div>
            <HorizontalMenu items={seasons.slice(0, itemsInRow).map((item) => ({ ...item, id }))} />
        </section>
    );
};

export default TVSeasonScrollRow;
