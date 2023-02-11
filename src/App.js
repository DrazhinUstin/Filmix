import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Home, MovieDetail, MovieImages } from './pages';
import { Navbar } from './components';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='movies/:id' element={<Outlet />}>
                    <Route index element={<MovieDetail />} />
                    <Route path='images' element={<MovieImages />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
