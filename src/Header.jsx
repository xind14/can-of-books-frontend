import React from 'react';
import Container from 'react-bootstrap/Container';
import { Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>My Favorite Books</Navbar.Brand>
      <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
      <NavItem><Link to="/" className="nav-link">About</Link></NavItem>
      <NavItem>
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">
            Another action
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">
            Separated link
          </NavDropdown.Item>
        </NavDropdown>
      </NavItem>
    </Navbar>
  );
}

export default Header;
