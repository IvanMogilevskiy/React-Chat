import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Navbar from './commonComponents/Navbar.jsx';
import LoginPage from './loginPage/LoginPage.jsx';
import ErrorPage from './errorPage/ErrorPage.jsx';
import SignUpPage from './signUpPage/SignUpPage.jsx';
import MainPage from './mainPage/MainPage.jsx';
import useAuth from './authentication/useAuth.jsx';
import 'react-toastify/dist/ReactToastify.css';
import routes from '../routes.js';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    user ? children : <Navigate to={routes.loginPage} state={{ from: location }} />
  );
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    user ? <Navigate to={routes.mainPage} state={{ from: location }} /> : children
  );
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <Navbar />
      <Routes>
        <Route path={routes.mainPage} element={(<PrivateRoute><MainPage /></PrivateRoute>)} />
        <Route path={routes.loginPage} element={(<PublicRoute><LoginPage /></PublicRoute>)} />
        <Route path={routes.signUpPage} element={(<PublicRoute><SignUpPage /></PublicRoute>)} />
        <Route path={routes.errorPage} element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  </div>
);

export default App;
