import { useCallback, useMemo, useState } from 'react';
import AuthContext from './authContext.jsx';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user')) ?? null;
  const [user, setUser] = useState(currentUser);

  const logIn = useCallback(({ data }) => {
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  const memo = useMemo(() => ({
    user,
    logIn,
    logOut,
  }), [user, logIn, logOut]);

  return (
    <AuthContext.Provider value={memo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
