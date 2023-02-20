import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isSearchEnabled, setIsSearchEnabled] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
        return () => unsubscribe();
    }, []);

    return (
        <GlobalContext.Provider value={{ user, isSearchEnabled, setIsSearchEnabled }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
