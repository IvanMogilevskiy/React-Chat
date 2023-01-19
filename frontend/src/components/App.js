import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import Navbar from './Navbar.jsx';
import LoginPage from './LoginPage.jsx';
import ErrorPage from './ErrorPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import MainPage from './MainPage.jsx';
import useAuth from '../hooks/useAuth.jsx';
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const PublicRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? <Navigate to="/" state={{ from: location }} /> : children
  );
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={(<PrivateRoute><MainPage /></PrivateRoute>)} />
        <Route path="/login" element={(<PublicRoute><LoginPage /></PublicRoute>)} />
        <Route path="/signup" element={(<PublicRoute><SignUpPage /></PublicRoute>)} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  </div>
);

export default App;
