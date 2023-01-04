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

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <Navbar />
    <Router>
      <Routes>
        <Route path="/" element={(<PrivateRoute><MainPage /></PrivateRoute>)} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  </div>
);

export default App;
