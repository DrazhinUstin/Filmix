import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
    Home,
    Movies,
    MovieMain,
    MovieDetail,
    MovieCredits,
    Images,
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
                <Route path='movies/:id' element={<MovieMain />}>
                    <Route index element={<MovieDetail />} />
                    <Route path='credits' element={<MovieCredits />} />
                    <Route path='images' element={<Images />} />
                </Route>
                <Route path='tv' element={<TVShows />} />
                <Route path='tv/:id' element={<TVShowMain />}>
                    <Route index element={<TVShowDetail />} />
                    <Route path='credits' element={<MovieCredits urlPart='tv' name='TV show' />} />
                    <Route path='images' element={<Images media_type='tv' label='TV show' />} />
                    <Route path='seasons' element={<TVSeasons />} />
                    <Route path='seasons/:season_number' element={<TVSeasonMain />}>
                        <Route index element={<TVSeasonDetail />} />
                        <Route
                            path='credits'
                            element={<MovieCredits urlPart='tv' name='season' />}
                        />
                        <Route path='episode/:episode_number' element={<TVEpisodeMain />}>
                            <Route index element={<TVEpisodeDetail />} />
                            <Route
                                path='credits'
                                element={<MovieCredits urlPart='tv' name='episode' />}
                            />
                            <Route
                                path='images'
                                element={<Images media_type='tv' label='episode' />}
                            />
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
                </Route>
                <Route path='*' element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
