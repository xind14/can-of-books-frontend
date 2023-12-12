import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

let url = import.meta.env.VITE_LOCAL_SERVER;

function EmptyLibrary() {
  const [showAlert, setShowAlert] = useState(true);
  if (showAlert === true) {
    return (
      <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <Alert.Heading>Book Collection Empty</Alert.Heading>
        <p>
          Please use the menu above to add books to your collection.
        </p>
      </Alert>
    );
  }
  return <Button onClick={() => setShowAlert(true)}>Show Alert</Button>;
}

function BestBooks(props) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchBooks() {
      if (props.getBooks) {
        try {
          let response = await axios.get(`${url}/books`);
          setBooks(response.data);
          console.log(response.data);
        } catch(error) {
          console.log(error.message);
        }
      }
    }
    fetchBooks();
  }, [props.getBooks]);

  if (books.length < 1) {
    return <EmptyLibrary />;
  }

  return (
    <>
      <Carousel>
        {/* <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2> */}
        {books.map((book, i) => {
          return(
            <Carousel.Item key={books[i]._id}>
              <Image src='/images/placeholder.png' alt='image of bookcover' />
              <Carousel.Caption>
                <h3>{books[i].title}</h3>
                <p>{books[i].description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );           
        })}
      </Carousel>
    </>
  );
}

export default BestBooks;
