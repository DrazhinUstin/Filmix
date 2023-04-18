import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    Home,
    Movies,
    MovieMain,
    MovieDetail,
    Credits,
    Media,
    Images,
    Videos,
    TVShows,
    TVShowMain,
    TVShowDetail,
    TVSeasons,
    TVSeasonMain,
    TVSeasonDetail,
    TVEpisodeMain,
    TVEpisodeDetail,
    People,
    PersonMain,
    PersonDetail,
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
    Ratings,
    NotFound,
} from './pages';
import { Navbar, SearchForm, Footer } from './components';
import { ToastContainer } from 'react-toastify';

const App = () => {
    return (
        <Router>
            <Navbar />
            <SearchForm />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='movies' element={<Movies />} />
                <Route path='movies/:id' element={<MovieMain />}>
                    <Route index element={<MovieDetail />} />
                    <Route path='credits' element={<Credits />} />
                    <Route element={<Media />}>
                        <Route path='images' element={<Images />} />
                        <Route path='videos' element={<Videos />} />
                    </Route>
                </Route>
                <Route path='tv' element={<TVShows />} />
                <Route path='tv/:id' element={<TVShowMain />}>
                    <Route index element={<TVShowDetail />} />
                    <Route path='credits' element={<Credits media_type='tv' label='TV show' />} />
                    <Route element={<Media />}>
                        <Route path='images' element={<Images media_type='tv' label='TV show' />} />
                        <Route path='videos' element={<Videos media_type='tv' label='TV show' />} />
                    </Route>
                    <Route path='seasons' element={<TVSeasons />} />
                    <Route path='seasons/:season_number' element={<TVSeasonMain />}>
                        <Route index element={<TVSeasonDetail />} />
                        <Route
                            path='credits'
                            element={<Credits media_type='tv' label='season' />}
                        />
                        <Route element={<Media />}>
                            <Route
                                path='images'
                                element={<Images media_type='tv' label='season' />}
                            />
                            <Route
                                path='videos'
                                element={<Videos media_type='tv' label='season' />}
                            />
                        </Route>
                        <Route path='episode/:episode_number' element={<TVEpisodeMain />}>
                            <Route index element={<TVEpisodeDetail />} />
                            <Route
                                path='credits'
                                element={<Credits media_type='tv' label='episode' />}
                            />
                            <Route element={<Media />}>
                                <Route
                                    path='images'
                                    element={<Images media_type='tv' label='episode' />}
                                />
                                <Route
                                    path='videos'
                                    element={<Videos media_type='tv' label='episode' />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </Route>
                <Route path='people' element={<People />} />
                <Route path='people/:id' element={<PersonMain />}>
                    <Route index element={<PersonDetail />} />
                    <Route path='images' element={<Images media_type='person' />} />
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
                    <Route path='ratings' element={<Ratings />} />
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
            <ToastContainer position='top-center' closeButton={false} />
        </Router>
    );
};

export default App;
