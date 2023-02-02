import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from 'react-router-dom';
import Navbar from './commonComponents/Navbar.jsx';
import LoginPage from './loginPage/LoginPage.jsx';
import ErrorPage from './errorPage/ErrorPage.jsx';
import SignUpPage from './signUpPage/SignUpPage.jsx';
import MainPage from './mainPage/MainPage.jsx';
import useAuth from './authentication/useAuth.jsx';
import 'react-toastify/dist/ReactToastify.css';
import routes from '../routes.js';

const PrivateRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    user ? <Outlet /> : <Navigate to={routes.loginPage} state={{ from: location }} />
  );
};

const PublicRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    user ? <Navigate to={routes.mainPage} state={{ from: location }} /> : <Outlet />
  );
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <Navbar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path={routes.mainPage} element={<MainPage />} />
        </Route>
        <Route element={<PublicRoute />}>
          <Route path={routes.loginPage} element={<LoginPage />} />
          <Route path={routes.signUpPage} element={<SignUpPage />} />
        </Route>
        <Route path={routes.errorPage} element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  </div>
);

export default App;
