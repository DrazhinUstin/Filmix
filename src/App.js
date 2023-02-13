import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Home, MovieDetail, MovieImages, Search } from './pages';
import { Navbar, SearchForm } from './components';

const App = () => {
    return (
        <Router>
            <Navbar />
            <SearchForm />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='movies/:id' element={<Outlet />}>
                    <Route index element={<MovieDetail />} />
                    <Route path='images' element={<MovieImages />} />
                </Route>
                <Route path='search/:q' element={<Search />} />
            </Routes>
        </Router>
    );
};

export default App;
