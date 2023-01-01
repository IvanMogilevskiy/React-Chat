import React from 'react';
import { Button, Navbar as Header } from 'react-bootstrap';
import useAuth from '../hooks/useAuth.jsx';

const Navbar = () => {
  const auth = useAuth();

  return (
    <Header className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Header.Brand className="navbar-brand" href="/">
          Hexlet Chat
        </Header.Brand>
        {auth.loggedIn && <Button onClick={auth.logOut}>Выйти</Button>}
      </div>
    </Header>
  );
};

export default Navbar;
