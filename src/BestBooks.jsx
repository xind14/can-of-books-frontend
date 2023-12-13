import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import BookFormModal from './Components/BookFormModal';
import EmptyLibrary from './Components/EmptyLibrary';

const url = import.meta.env.VITE_SERVER;
console.log(url);

function BestBooks(props) {
  const [books, setBooks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async (event) => {
    try {
      let response = await axios.delete(`${url}/books/${event.target.id}`);
      let book = response.data;
      let newBooks = books.filter((book) => {
        return book._id !== event.target.id;
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
    FetchBooks();
    return () => {
      console.log("Unmount");
    };
  }, []);

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
                  <span onClick={handleDelete} id={book._id} style={{ marginLeft: ".5em", color: "red", cursor: "pointer",fontSize:'30px'}}>Delete Book</span>
                  <span onClick={handleDelete} id={book._id} style={{ marginLeft: ".5em", color: "red", cursor: "pointer",fontSize:'30px'}}>Update Book</span>

                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>

      </>
    );
  } else {
    return (
      <>
      <BookFormModal setBooks={setBooks} books={[]}/>
      <EmptyLibrary show={showAlert} />
      </>
    )
  }
}

export default BestBooks;