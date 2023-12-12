import React, { useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { Alert } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';


let SERVER = import.meta.env.VITE_LOCAL_SERVER;

function BestBooks() {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      let response = await axios.get(`${SERVER}/books`);
      setBooks(response.data);
    } catch (error) {
      setBooks([]); 
    }
  };

  if (books.length === 0) {
    getBooks();
  }
  return (
    <>
      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
      {books.length > 0 ? (
        <Carousel>
          {books.map((book, i) => (
            <Carousel.Item key={i}>
            <Image text="1st book" />
            <Carousel.Caption>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <Alert variant="info">Book Collection is Empty</Alert>
      )}
    </>
  );
}

export default BestBooks;







