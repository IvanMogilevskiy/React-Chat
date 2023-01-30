import { Button, Navbar as Header, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useAuth from '../authentication/useAuth.jsx';
import routes from '../../routes.js';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { t } = useTranslation();

  return (
    <Header bg="white" expand="lg" className="shadow-sm">
      <Container>
        <Header.Brand href={routes.mainPage}>
          {t('navbar.title')}
        </Header.Brand>
        {user && (
          <Button onClick={logOut} variant="primary">{t('navbar.logout')}</Button>
        )}
      </Container>
    </Header>
  );
};

export default Navbar;
