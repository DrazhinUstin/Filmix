import { createContext, useContext, useReducer } from 'react';
import { watchlistOrderOptions, watchlistLimitOptions } from '../utils/localData';

const WatchlistContext = createContext();
export const useWatchlistContext = () => useContext(WatchlistContext);

const WatchlistProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <WatchlistContext.Provider value={{ ...state, dispatch }}>
            {children}
        </WatchlistContext.Provider>
    );
};

export default WatchlistProvider;

const initialState = {
    filters: {
        genre: '',
        order: watchlistOrderOptions[0].value,
        limit: watchlistLimitOptions[1],
    },
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FILTERS':
            return {
                ...state,
                filters: { ...state.filters, [action.payload.name]: action.payload.value },
            };
        case 'RESTORE_FILTERS':
            return { ...state, filters: initialState.filters };
        default:
            throw Error(`No action with type: ${action.type}`);
    }
};
