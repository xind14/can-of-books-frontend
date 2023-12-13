import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// let url = import.meta.env.VITE_LOCAL_SERVER;



function Header(props) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <DropdownButton id="dropdown-item-button" title="Menu">
              <Dropdown.ItemText></Dropdown.ItemText>
              <Dropdown.Item  onClick={props.modalShow}>Add Books</Dropdown.Item>
              <Dropdown.Item href="/updateBook">Update a Book</Dropdown.Item>
              <Dropdown.Item href="/deleteBook">Delete a Book</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/books">Get Books</Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
