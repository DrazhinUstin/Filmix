import { createContext, useContext, useReducer } from 'react';
import { ratingsOrderOptions } from '../utils/localData';
import reducer from '../reducers/ratingsReducer';

const RatingsContext = createContext();
export const useRatingsContext = () => useContext(RatingsContext);

export const initialState = {
    filters: {
        media_type: '',
        rating: '',
    },
    order: ratingsOrderOptions[0].value,
};

const RatingsProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <RatingsContext.Provider value={{ ...state, dispatch }}>{children}</RatingsContext.Provider>
    );
};

export default RatingsProvider;
