import { Hero, ScrollRow } from '../components';

const Home = () => {
    return (
        <main>
            <Hero />
            <ScrollRow title='most popular' url='/movie/popular' />
            <ScrollRow title='top rated' url='/movie/top_rated' />
            <ScrollRow title='upcoming' url='/movie/upcoming' />
        </main>
    );
};

export default Home;
