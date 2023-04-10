import { createContext, useContext, useReducer, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import reducer from '../reducers/globalReducer';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const initialState = {
    user: null,
    isSearchEnabled: false,
    recentlyViewed: JSON.parse(localStorage.getItem('recently_viewed')) || [],
};

const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            dispatch({ type: 'SET_USER', payload: user });
            if (!user) dispatch({ type: 'CLEAR_RECENTLY_VIEWED' });
        });
        return () => unsubscribe();
    }, []);

    return (
        <GlobalContext.Provider value={{ ...state, dispatch }}>{children}</GlobalContext.Provider>
    );
};

export default GlobalProvider;
