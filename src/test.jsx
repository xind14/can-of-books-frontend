import React, { useState } from 'react';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import EmptyLibrary from './Components/EmptyLibrary';


function App () {

  // const [getBooks, setGetBooks] = useState(false);
  // const handleGetBooks = () => {
  //   setGetBooks(true);
  // };

  return (
    <>
      <Router>
        <Header />
        {/* <BestBooks getBooks={getBooks} /> */}
        <Routes>
          <Route 
            exact path="/"
            element={<Home />}
            >
          </Route>
          <Route 
            exact path="/books"
            element={<BestBooks />}
            >
          </Route>
          <Route 
            exact path="/about"
            element={<About />}
            >
          </Route>
        </Routes>
      <Footer />
    </Router>
  </>
  )
}

export default App;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import Header from './Header';
import { Image } from 'react-bootstrap';
import BookFormModal from './Components/BookFormModal';
import EmptyLibrary from './Components/EmptyLibrary';

const url = import.meta.env.VITE_LOCAL_SERVER;

function BestBooks(props) {
  const [books, setBooks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async (event) => {
    try {
      let response = await axios.delete(`${url}/books${event.target.id}`);
      let book = response.data;
      let newBooks = books.filter((book) => {
        return book.id !== event.target.id;
      });
      setBooks(newBooks);
    } catch (error) {
      console.error(error.message);
    }
  };

  const FetchBooks = async () => {
    try {
      console.log(`${url}/books`);
      let response = await axios.get(`${url}/books`);
      console.log(response.data);
      setBooks(response.data);
      if (response.data.length === 0) {
        setShowAlert(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    console.log("Mount up");
    console.log("setBooks in BestBooks:", setBooks);
    FetchBooks();
    return () => {
      console.log("Unmount");
    };
  }, []);

  return (
    <>
       <Carousel>
          <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
          {books.map((book) => {
             console.log("Book:", book);
            return (
              <Carousel.Item key={book._id}>
                <Image style={{ width: '100%' }} src='/images/placeholder.png' alt='image of bookcover' />
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <p>{book.status}</p>
                  <span onClick={handleDelete} id={book._id} style={{ marginLeft: ".5em", color: "red", cursor: "pointer" }}>Delete Book</span>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      <BookFormModal setBooks={setBooks} onHide={() => setShowModal(false)} />
      <EmptyLibrary show={showAlert} />
    </>
  );
}

export default BestBooks;

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const url = import.meta.env.VITE_LOCAL_SERVER;

function BookFormModal({ setBooks, onHide, show}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  function handleChange(event) {
    let name = event.target.name;
    let value = event.target.value;
    if (name === 'title') {
      setTitle(value);
    }
    if (name === 'description') {
      setDescription(value);
    }
    if (name === 'status') {
      setStatus(value);
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    let book = { title, description, status };
    console.log('Sending a book', book);
    console.log('setBooks in BookFormModal before:', setBooks);
    try {
      let response = await axios.post(`${url}/books`, book);
      console.log('Server Response', response.data);
      setBooks((prevBooks) => [...prevBooks, response.data]);
           console.log('setBooks in BookFormModal after:', setBooks);
      onHide();

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true} // Assuming you want to show the modal by default
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add a Book!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="bookForm3" controlId="bookForm">
              <Form.Control
                onChange={handleChange}
                name="title"
                placeholder="Book Title"
              />
              <Form.Control
                onChange={handleChange}
                name="description"
                placeholder="Book Description"
              />
              <Form.Select
                onChange={handleChange}
                name="status"
                aria-label="Default select example"
              >
                <option>Reading Status</option>
                <option value="Want to Read">Want to Read</option>
                <option value="Currently Reading">Currently Reading</option>
                <option value="Favorites">Favorites</option>
                <option value="Recommended">Recommended</option>
              </Form.Select>
              <Button type="submit" variant="primary">
                Save Book
              </Button>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={onHide} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default BookFormModal;


import React ,{useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import BookFormModal from './Components/BookFormModal';

function Header(setBooks) {
  const [showModal, setShowModal] = useState(false);

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
                <Dropdown.Item onClick={() => setShowModal(true)}>Add Books</Dropdown.Item>
                <Dropdown.Item href="/updateBook">Update a Book</Dropdown.Item>
                <Dropdown.Item href="/deleteBook">Delete a Book</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="/books">Get Books</Dropdown.Item>
              </DropdownButton>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <BookFormModal setBooks={setBooks} onHide={() => setShowModal(false)} />
    </>
  );
}

export default Header;
