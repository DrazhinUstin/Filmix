import { Hero, ScrollRow } from '../components';

const Home = () => {
    return (
        <main>
            <Hero />
            <ScrollRow title='trending' url='trending/movie/day' />
            <ScrollRow title='most popular' url='/movie/popular' />
            <ScrollRow title='upcoming' url='/movie/upcoming' />
        </main>
    );
};

export default Home;
