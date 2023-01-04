import { useCallback, useMemo, useState } from 'react';
import AuthContext from '../contexts/authContext.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = useCallback(() => {
    setLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  }, []);

  const getAuthHeader = useCallback(() => {
    const userId = JSON.parse(localStorage.getItem('userId'));

    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
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
