import React, { createContext } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const isLoggedIn = () => {
    const token = localStorage.getItem('token');
    if (token === 'undefined' || token === null || token === false) {
      return false;
    }
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp * 1000 > Date.now()) {
      return true;
    }
    else {
      localStorage.removeItem('token');
      return false;
    }
  };

  const isAdmin = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const decodedToken = jwtDecode(token);
    return decodedToken.admin === 1;
  }

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }

  const idUser = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }
    const decodedToken = jwtDecode(token);
    return decodedToken.id;
  }



  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, logout, idUser }}>
      {children}
    </AuthContext.Provider>
  );
};