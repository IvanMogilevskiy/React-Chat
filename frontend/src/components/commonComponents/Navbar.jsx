import { Button, Navbar as Header, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../authentication/useAuth.jsx';
import routes from '../../routes.js';

const Navbar = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Header bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Header.Brand href={routes.mainPage()}>
          Hexlet Chat
        </Header.Brand>
        {auth.loggedIn && (
          <Button onClick={auth.logOut} variant="primary">{t('navbar.logout')}</Button>
        )}
      </Container>
    </Header>
  );
};

export default Navbar;
