import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from './logo.png'
import './header.css';
import useAuth from '../../hooks/useAuth';
const Header = () => {
  const {user,logOut} = useAuth();
    return (
        <>
            <Navbar bg='light' className='d-block' expand="lg" fixed='top'>
    <Container>
    <Navbar.Brand href="#home"><img src={logo}width="150" height="50" alt="" /></Navbar.Brand>
    <Navbar.Toggle aria-controls="navbarScroll" />
    <Navbar.Collapse id="navbarScroll">
    <Nav className="ms-auto navigation">
      <Link to="/home">Home</Link>
      <Link to="/healthtips">Healthtips</Link>
      <Link to="/doctors">Doctors</Link>
      <small className='userName'>{user.displayName}</small>
      {user.email? <button className='btn btn-dark' onClick={logOut}>Log out</button> :<Link to="/login">Login</Link>}
    </Nav>
    </Navbar.Collapse>
    </Container>
  </Navbar>
        </>
    );
};

export default Header;