import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

let url = import.meta.env.VITE_LOCAL_SERVER

async function BestBooks() {
  const [books, setBooks] = useState([]);
  if (books.length>0) {
    try {
      let response = await axios.get(`${url}/books`);
      setBooks(response.data);
      booklist = books;
      // console.log(response.data);
    } catch(error) {
      setErrorMessage(error.message);
    }
  

  // TODO: Make a GET request to your API to fetch all the books from the database
  // useEffect(() => {
  //   fetchBooks();
  // }, []);
    // console.log(props.booklist.title);
  return (
    <>
      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
      <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <ExampleCarouselImage text="First slide" />
        <Carousel.Caption>
          <h3>{props.booklist.title}</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
    )
  }
}

{/* 
      {this.state.books.length ? (
        <p>Book Carousel coming soon</p>
      ) : (
        <h3>No Books Found :(</h3>
      )} */}

export default BestBooks;
