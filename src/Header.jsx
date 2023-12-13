import React ,{useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import BookFormModal from './Components/BookFormModal';






function Header() {
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    setShowModal(false);

  }, []);


  return (
    <>
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
              <Dropdown.Item onClick={showModal ? undefined : () => setShowModal(true)}>Add Books</Dropdown.Item>
              <Dropdown.Item href="/updateBook">Update a Book</Dropdown.Item>
              <Dropdown.Item href="/deleteBook">Delete a Book</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/books">Get Books</Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {showModal && <BookFormModal show={showModal} onHide={()=> setShowModal(false)}/> }
</>
  );
 

  }


export default Header;