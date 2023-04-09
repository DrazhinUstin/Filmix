import { Hero, RecentlyViewed, SelectableScrollRow } from '../components';

const Home = () => {
    return (
        <main>
            <Hero />
            <RecentlyViewed />
            <SelectableScrollRow
                title='trending'
                data={[
                    { name: 'today', url: '/trending/all/day' },
                    { name: 'this week', url: '/trending/all/week' },
                ]}
            />
            <SelectableScrollRow
                title='most popular'
                data={[
                    { name: 'movies', url: '/movie/popular' },
                    { name: 'TV shows', url: '/tv/popular' },
                    { name: 'people', url: '/person/popular' },
                ]}
            />
            <SelectableScrollRow
                title='now playing'
                data={[
                    { name: 'in theatres', url: '/movie/now_playing' },
                    { name: 'on the air', url: '/tv/on_the_air' },
                ]}
            />
        </main>
    );
};

export default Home;
