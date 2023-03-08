import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './GlobalStyles';
import GlobalProvider from './contexts/GlobalContext';
import MoviesProvider from './contexts/MoviesContext';
import PeopleProvider from './contexts/PeopleContext';
import WatchlistProvider from './contexts/WatchlistContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyle />
        <GlobalProvider>
            <MoviesProvider>
                <PeopleProvider>
                    <WatchlistProvider>
                        <App />
                    </WatchlistProvider>
                </PeopleProvider>
            </MoviesProvider>
        </GlobalProvider>
    </React.StrictMode>
);
