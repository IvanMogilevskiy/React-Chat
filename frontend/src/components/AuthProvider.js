import { useCallback, useMemo, useState } from 'react';
import AuthContext from '../contexts/authContext.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('user'));

  const logIn = useCallback(() => {
    setLoggedIn(true);
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

  const memo = useMemo(() => ({
    loggedIn,
    logIn,
    logOut,
    getAuthHeader,
  }), [loggedIn, logIn, logOut, getAuthHeader]);

  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
