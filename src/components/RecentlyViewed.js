import { useGlobalContext } from '../contexts/GlobalContext';
import { Title, TextButton, HorizontalMenu } from './';

const RecentlyViewed = () => {
    const { recentlyViewed, dispatch } = useGlobalContext();
    if (!recentlyViewed.length) return null;
    return (
        <section className='section section-center'>
            <Title>
                recently <span>viewed</span>
            </Title>
            <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
                <TextButton onClick={() => dispatch({ type: 'CLEAR_RECENTLY_VIEWED' })}>
                    clear all
                </TextButton>
            </div>
            <HorizontalMenu items={recentlyViewed} />
        </section>
    );
};

export default RecentlyViewed;
