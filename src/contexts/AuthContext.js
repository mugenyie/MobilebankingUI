import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accountNumber, setAccountNumber] = useState(null);

    const saveSessionData = (value) => {
        sessionStorage.setItem('userData', JSON.stringify(value));
    };

    const getSessionData = () => {
        var item_value = sessionStorage.getItem('userData', );
        return item_value ? JSON.parse(item_value) : null;
    };

    const logOut = () => {
        sessionStorage.clear();
        window.location.reload(false);
    };

    return (
        <AuthContext.Provider value={{logOut, saveSessionData, getSessionData, accountNumber, setAccountNumber}}>
          {children}
        </AuthContext.Provider>
      );
}

export const useAuthContext = () => useContext(AuthContext);