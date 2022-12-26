import React from 'react';
import { Navbar as Header } from 'react-bootstrap/Navbar';
import { Button, Container } from 'react-bootstrap';
import useAuth from '../hooks/useAuth.jsx';

const Navbar = () => {
  const auth = useAuth();

  return (
    <Header className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <Container>
        <div className="container">
          <Header.Brand className="navbar-brand" href="/">
            Hexlet Chat
          </Header.Brand>
          {auth.loggedIn && <Button onClick={auth.logOut}>Выйти</Button>}
        </div>
      </Container>
    </Header>
  );
};

export default Navbar;
