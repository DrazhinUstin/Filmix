import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './GlobalStyles';
import GlobalProvider from './contexts/GlobalContext';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <GlobalStyle />
        <GlobalProvider>
            <App />
        </GlobalProvider>
    </React.StrictMode>
);
