import { createContext, useContext, useReducer } from 'react';

const MoviesContext = createContext();
export const useMoviesContext = () => useContext(MoviesContext);

const MoviesProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <MoviesContext.Provider value={{ ...state, dispatch }}>{children}</MoviesContext.Provider>
    );
};

export default MoviesProvider;

const initialState = {
    filters: {
        sort: 'popularity.desc',
        genre: '',
        year: '',
        language: '',
        runtime: '',
        certification: '',
    },
    page: 0,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FILTERS':
            return {
                ...state,
                filters: { ...state.filters, [action.payload.name]: action.payload.value },
                page: 0,
            };
        case 'RESTORE_FILTERS':
            return { ...state, filters: initialState.filters, page: 0 };
        case 'SWITCH_PAGE':
            return { ...state, page: action.payload };
        default:
            throw Error(`No action with type: ${action.type}`);
    }
};
