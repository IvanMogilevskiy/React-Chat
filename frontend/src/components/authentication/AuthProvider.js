import { useCallback, useMemo, useState } from 'react';
import AuthContext from './authContext.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('user'));

  const logIn = useCallback((response) => {
    setLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(response.data));
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  }, []);

  const getAuthHeader = useCallback(() => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
      return { Authorization: `Bearer ${user.token}` };
    }

    return {};
  }, []);

  const getUsername = useCallback(() => {
    const { username } = JSON.parse(localStorage.getItem('user'));
    return username;
  }, []);

  const memo = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
    getAuthHeader,
    getUsername,
  }), [loggedIn, logIn, logOut, getAuthHeader, getUsername]);

  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
