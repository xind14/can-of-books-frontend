import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { Alert } from 'react-bootstrap';

let url = import.meta.env.VITE_LOCAL_SERVER

async function BestBooks() {
  const [books, setBooks] = useState([]);
  // if (books.length<1) {
  //   return (Alert.danger('Book Collection is Empty'));
  }
  if (books.length>0) {
    try {
      let response = await axios.get(`${url}/books`);
      setBooks(response.data);
      // console.log(response.data);
    } catch(error) {
      setErrorMessage(error.message);
    }
    return (
      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>,
      <Carousel activeIndex={index} onSelect={handleSelect}>
      {books.map((book, i) => {
        <Carousel.Item>
          <ExampleCarouselImage text="1st book" />
          <Carousel.Caption>
            <h3>{books[i].title}</h3>
            <p>{books[i].description}</p>
          </Carousel.Caption>
        </Carousel.Item>
        })
      }
        </Carousel>
        )
     }
}        

export default BestBooks;
