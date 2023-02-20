import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import {
    Home,
    Movies,
    MovieDetail,
    MovieImages,
    Search,
    About,
    Auth,
    RequireAuth,
    Profile,
    NotFound,
} from './pages';
import { Navbar, SearchForm } from './components';

const App = () => {
    return (
        <Router>
            <Navbar />
            <SearchForm />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='movies' element={<Movies />} />
                <Route path='movies/:id' element={<Outlet />}>
                    <Route index element={<MovieDetail />} />
                    <Route path='images' element={<MovieImages />} />
                </Route>
                <Route path='search/:q' element={<Search />} />
                <Route path='about' element={<About />} />
                <Route path='auth' element={<Auth />} />
                <Route element={<RequireAuth />}>
                    <Route path='profile' element={<Profile />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;
