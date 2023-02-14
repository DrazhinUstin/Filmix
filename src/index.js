import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './GlobalStyles';
import GlobalProvider from './contexts/GlobalContext';
import MoviesProvider from './contexts/MoviesContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyle />
        <GlobalProvider>
            <MoviesProvider>
                <App />
            </MoviesProvider>
        </GlobalProvider>
    </React.StrictMode>
);
