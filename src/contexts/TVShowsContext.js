import { createContext, useContext, useReducer } from 'react';
import { tmdbTVSortOptions } from '../utils/localData';
import reducer from '../reducers/tvShowsReducer';

const TVShowsContext = createContext();
export const useTVShowsContext = () => useContext(TVShowsContext);

export const initialState = {
    filters: {
        genre: '',
        language: '',
        year: '',
        status: '',
        runtime: '',
        sort: tmdbTVSortOptions[0].value,
    },
    page: 1,
};

const TVShowsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <TVShowsContext.Provider value={{ ...state, dispatch }}>{children}</TVShowsContext.Provider>
    );
};

export default TVShowsProvider;
