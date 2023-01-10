import { Button, Navbar as Header } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';

const Navbar = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Header className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Header.Brand className="navbar-brand" href="/">
          Hexlet Chat
        </Header.Brand>
        {auth.loggedIn && (
          <Button onClick={auth.logOut}>{t('navbar.logout')}</Button>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
