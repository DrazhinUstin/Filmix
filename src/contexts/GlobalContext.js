import { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isSearchEnabled, setIsSearchEnabled] = useState(false);
    return (
        <GlobalContext.Provider value={{ isSearchEnabled, setIsSearchEnabled }}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;
