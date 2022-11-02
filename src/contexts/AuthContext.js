import React, { createContext, useState, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const saveSessionData = () => {
    };

    const getSessionData = () => {
    };

    const logOut = () => {

    };

    return (
        <AuthContext.Provider value={{logOut, saveSessionData, getSessionData}}>
          {children}
        </AuthContext.Provider>
      );
}

export const useAuthContext = () => useContext(AuthContext);