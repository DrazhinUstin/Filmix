import { createContext, useContext, useReducer } from 'react';
import {
    watchlistMediaTypeOptions,
    watchlistOrderOptions,
    watchlistLimitOptions,
} from '../utils/localData';
import reducer from '../reducers/watchlistReducer';

const WatchlistContext = createContext();
export const useWatchlistContext = () => useContext(WatchlistContext);

export const initialState = {
    genres: { movie: [], tv: [] },
    media_type: watchlistMediaTypeOptions[0].value,
    filters: {
        genre: '',
        limit: watchlistLimitOptions[0],
    },
    order: watchlistOrderOptions[0].value,
};

const WatchlistProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <WatchlistContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export default WatchlistProvider;
