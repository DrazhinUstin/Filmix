import { createContext, useContext, useReducer } from 'react';
import { tmdbSortOptions } from '../utils/localData';
import reducer from '../reducers/moviesReducer';

const MoviesContext = createContext();
export const useMoviesContext = () => useContext(MoviesContext);

export const initialState = {
    filters: {
        genre: '',
        year: '',
        language: '',
        runtime: '',
        certification: '',
    },
    sort: tmdbSortOptions[0].value,
    page: 0,
};

const MoviesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <MoviesContext.Provider value={{ ...state, dispatch }}>{children}</MoviesContext.Provider>
    );
};

export default MoviesProvider;
