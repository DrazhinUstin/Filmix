import { createContext, useContext, useReducer } from 'react';
import reducer from '../reducers/peopleReducer';

const PeopleContext = createContext();
export const usePeopleContext = () => useContext(PeopleContext);

const initialState = {
    query: '',
    page: 1,
};

const PeopleProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <PeopleContext.Provider value={{ ...state, dispatch }}>{children}</PeopleContext.Provider>
    );
};

export default PeopleProvider;
