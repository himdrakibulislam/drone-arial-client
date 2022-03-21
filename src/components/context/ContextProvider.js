import React, { createContext } from 'react';
import useFirebase from '../../hooks/useFirebase';
export const getContext = createContext()
const ContextProvider = ({children}) => {
    const all = useFirebase()
    return (
        <getContext.Provider value={all}>
            {
                children
            }
        </getContext.Provider>
    );
};

export default ContextProvider;