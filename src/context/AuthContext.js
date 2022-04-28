import React, { createContext } from 'react';
import useFirebase from '../hooks/useFirebase'
export const contextProvider = createContext();
const AuthContext = ({children}) => {
    const all = useFirebase()
    return (
        <contextProvider.Provider value={all}>
            {
                children
            }
        </contextProvider.Provider>
    );
};

export default AuthContext;