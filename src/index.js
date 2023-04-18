import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './GlobalStyles';
import '@smastrom/react-rating/style.css';
import 'react-toastify/dist/ReactToastify.css';
import GlobalProvider from './contexts/GlobalContext';
import MoviesProvider from './contexts/MoviesContext';
import TVShowsProvider from './contexts/TVShowsContext';
import PeopleProvider from './contexts/PeopleContext';
import WatchlistProvider from './contexts/WatchlistContext';
import RatingsProvider from './contexts/RatingsContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyle />
        <GlobalProvider>
            <MoviesProvider>
                <TVShowsProvider>
                    <PeopleProvider>
                        <WatchlistProvider>
                            <RatingsProvider>
                                <App />
                            </RatingsProvider>
                        </WatchlistProvider>
                    </PeopleProvider>
                </TVShowsProvider>
            </MoviesProvider>
        </GlobalProvider>
    </React.StrictMode>
);
