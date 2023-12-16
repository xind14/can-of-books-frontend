import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import BookFormModal from './Components/BookFormModal';
import EmptyLibrary from './Components/EmptyLibrary';
import UpdateFormModal from './Components/UpdateFormModal'; 

const url = import.meta.env.VITE_LOCAL_SERVER;
console.log(url);

function BestBooks(props) {
  const [books, setBooks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDelete = async (event) => {
    try {
      console.log('Deleting book...');
      let response = await axios.delete(`${url}/books/${event.target.id}`);
      let book = response.data;
      let newBooks = books.filter((book) => {
        return book._id !== event.target.id;
      });
      setBooks(newBooks);
      console.log('Book deleted successfully.');
    } catch (error) {
      console.error('Error deleting book:', error.message);
    }
  };

  const FetchBooks = async () => {
    try {
      console.log('Fetching books...');
      let response = await axios.get(`${url}/books`);
      console.log('Fetched books:', response.data);
      setBooks(response.data);
      if (response.data.length === 0) {
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error fetching books:', error.message);
    }
  }

  const selectBook = (book) => {
    console.log('Selected book:', book);
    setSelectedBook(book);
    setShowUpdateModal(true);

  }

  const handleUpdate = async (event) => {
    try {
      console.log('Updating book...');
      let response = await axios.put(`${url}/books/${event.target.id}`);
      let updatedBook = response.data;
      console.log("From the server, the book is:", updatedBook);
      let newBooksList = books.map(book => {
        if (book._id === updatedBook._id) {
          return updatedBook
        } else {
          return book
        }
      })
      setBooks(newBooksList);
      console.log('Book updated successfully.');
    } catch (error) {
      console.error('Error updating book:', error.message);
    }
  };

  useEffect(() => {
    console.log("Mount up");
    FetchBooks();
    setShowUpdateModal(false)
    return () => {
      console.log("Unmount");
    };
  }, []);

  console.log(showUpdateModal);
  if (books.length > 0) {
    return (
      <>
        <Carousel>
          <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
          {books.map((book) => {
            return (
              <Carousel.Item key={book._id}>
                <Image style={{ width: '100%' }} src='/images/placeholder.png' alt='image of bookcover' />
                <Carousel.Caption>
                  <h3>{book.title}</h3>
                  <p>{book.description}</p>
                  <p>{book.status}</p>

                  <span onClick={handleDelete} id={book._id} style={{ marginLeft: ".5em", color: "red", cursor: "pointer", fontSize: '30px' }}>Delete Book
                  </span>

                  <span onClick={() => selectBook(book)} style={{ marginLeft: ".5em", color: "red", cursor: "pointer", fontSize:'30px'}}>Update Book</span>      
                             
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
        {showUpdateModal && (<UpdateFormModal
       handleSubmit={handleUpdate}
            books={selectedBook}
            show={showUpdateModal}  
            onHide={() => setShowUpdateModal(false)}
          />  ) 
       
       } 

      </>
    );
  } else {
    return (
      <>
        <BookFormModal setBooks={setBooks} books={[]} />
              
             <EmptyLibrary show={showAlert} />
      </>
    );
  }
}

export default BestBooks;



import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';


const url = import.meta.env.VITE_SERVER;

function UpdateFormModal(props){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [showSaveAlert, setShowSaveAlert] = useState(false);




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
  const handleAlertDismiss = () => {
    setShowSaveAlert(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let book = { title, description, status };
    console.log('Updating a book', book);
    try {
      let response = await axios.post(`${url}/books`, book);
      console.log('Server Response', response.data);
      setShowSaveAlert(true);
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show} 
      onHide={props.onHide}
    >
      <Modal.Header>
        <Modal.Title>Update a Book!</Modal.Title>
        
      </Modal.Header>

      <Modal.Body>
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="bookForm3" controlId="bookForm">
              <Form.Control
                onChange={handleChange}
                name="title"
                placeholder="Book Title"
                value={title}
              />
              <Form.Control
                onChange={handleChange}
                name="description"
                placeholder="Book Description"
                value={description}

              />
              <Form.Select
                onChange={handleChange}
                name="status"
                value={status}
                aria-label="Default select example"
              >
                <option>Reading Status</option>
                <option value="Want to Read">Want to Read</option>
                <option value="Currently Reading">Currently Reading</option>
                <option value="Favorites">Favorites</option>
                <option value="Recommended">Recommended</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer>
              <Alert show={showSaveAlert} variant="success"  dismissible onClose={handleAlertDismiss}>
          Book updated successfully!
        </Alert>
        <Button type="submit" variant="primary" onClick={handleSubmit}>
                Save Book
              </Button>

      <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateFormModal;







import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';


const url = import.meta.env.VITE_LOCAL_SERVER;

function UpdateFormModal(props){
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [book, setBook] = useState({})




  function handleChange(event) {
    setBook({ ...book, [event.target.name]: event.target.value })

  }
  const handleAlertDismiss = () => {
    setShowSaveAlert(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit(book);
    console.log('Updating a book', book);
    setBook({title:'', description:'', status: ''});
  }
  useEffect(() => {
    console.log('props.updateBook changed');
    setBook(props.book || {});
}, [props.book])

  return (
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show} 
      onHide={props.onHide}
    >
      <Modal.Header>
        <Modal.Title>Update a Book!</Modal.Title>
        
      </Modal.Header>

      <Modal.Body>
        <div className="form-container">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="bookForm3" controlId="bookForm">
              <Form.Control
                onChange={handleChange}
                name="title"
                placeholder="Book Title"
                defaultValue={book.title}
              />
              <Form.Control
                onChange={handleChange}
                name="description"
                placeholder="Book Description"
                defaultValue={book.description}

              />
              <Form.Select
                onChange={handleChange}
                name="status"
                defaultValue={book.status}
                aria-label="Default select example"
              >
                <option>Reading Status</option>
                <option value="Want to Read">Want to Read</option>
                <option value="Currently Reading">Currently Reading</option>
                <option value="Favorites">Favorites</option>
                <option value="Recommended">Recommended</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer>
              <Alert show={showSaveAlert} variant="success"  dismissible onClose={handleAlertDismiss}>
          Book updated successfully!
        </Alert>
        <Button type="submit" variant="primary" onClick={handleSubmit}>
                Update Book
              </Button>

      <Button onClick={props.onHide} variant="secondary">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateFormModal;