import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, MovieDetail } from './pages';
import { Navbar } from './components';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='movies/:id' element={<MovieDetail />} />
            </Routes>
        </Router>
    );
};

export default App;
