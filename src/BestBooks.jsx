import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import BookFormModal from './Components/BookFormModal';
import EmptyLibrary from './Components/EmptyLibrary';
import UpdateFormModal from './Components/UpdateFormModal'; 
import {Button} from 'react-bootstrap';


const url = import.meta.env.VITE_SERVER;
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

  const handleUpdate = async (book) => {
    try {
      console.log('Updating book...');
      let response = await axios.put(`${url}/books/${book._id}`, book);
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
        <Carousel style={{ width:'50%', marginLeft: '25%' }}>
          <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
          {books.map((book) => {
            return (
              <Carousel.Item key={book._id}>
                <Image style={{ width: '100%'}} src='/images/bookcover.jpg' alt='image of bookcover' />
                <Carousel.Caption>
                  <h2  style={{ marginLeft: ".5em", background:"beige", color: "red", cursor: "pointer", fontSize: '50px', border:"solid black", borderRadius:"20px"  }}>{book.title}</h2>
                  <p  style={{ marginLeft: ".5em", background:"beige", color: "red", cursor: "pointer", fontSize: '40px' }}>{book.description}</p>
                  <p  style={{ marginLeft: ".5em", background:"beige", color: "red", cursor: "pointer", fontSize: '30px' }}>{book.status}</p>

                  <Button onClick={handleDelete}  variant="secondary" id={book._id} style={{ marginLeft: ".5em", background:"beige", color: "red", cursor: "pointer", fontSize: '30px' }}>Delete Book
                  </Button>

                  <Button onClick={() => selectBook(book)}  variant="secondary" style={{ marginLeft: ".5em", background:"beige",color: "red", cursor: "pointer", fontSize:'30px'}}>Update Book</Button>      
                             
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
        {showUpdateModal && (<UpdateFormModal
       handleSubmit={handleUpdate}
            book={selectedBook}
            show={showUpdateModal}  
            onHide={() => setShowUpdateModal(false)}
          />  ) 
       
       } 

      </>
    );
  } else {
    return (
      <>
                      <BookFormModal setBooks={setBooks} books={books} />

             <EmptyLibrary show={showAlert} />
      </>
    );
  }
}

export default BestBooks;
