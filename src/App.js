import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import {
    Home,
    Movies,
    MovieDetail,
    MovieCredits,
    MovieImages,
    People,
    PersonDetail,
    PersonImages,
    Search,
    About,
    Auth,
    ResetPassword,
    RequireAuth,
    ProfileLayout,
    Profile,
    EditProfile,
    UpdateEmail,
    UpdatePassword,
    WatchlistDetail,
    Watchlist,
    NotFound,
} from './pages';
import { Navbar, SearchForm, Footer } from './components';

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
                    <Route path='credits' element={<MovieCredits />} />
                    <Route path='images' element={<MovieImages />} />
                </Route>
                <Route path='people' element={<People />} />
                <Route path='people/:id' element={<Outlet />}>
                    <Route index element={<PersonDetail />} />
                    <Route path='images' element={<PersonImages />} />
                </Route>
                <Route path='search/:q' element={<Search />} />
                <Route path='about' element={<About />} />
                <Route path='auth' element={<Auth />} />
                <Route path='reset_password' element={<ResetPassword />} />
                <Route element={<RequireAuth />}>
                    <Route path='profile' element={<ProfileLayout />}>
                        <Route index element={<Profile />} />
                        <Route path='edit_profile' element={<EditProfile />} />
                        <Route path='update_email' element={<UpdateEmail />} />
                        <Route path='update_password' element={<UpdatePassword />} />
                        <Route path='watchlist' element={<WatchlistDetail />} />
                    </Route>
                    <Route path='watchlist' element={<Watchlist />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
