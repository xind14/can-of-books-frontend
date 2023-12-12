import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BestBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/books'); // Update the URL based on your server setup
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h2>My Essential Lifelong Learning & Formation Shelf</h2>

      {books.length ? (
        <div id="bookCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {books.map((book, index) => (
              <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                {/* Replace the following with the actual content you want to display for each book */}
                <h3>{book.title}</h3>
                <p>{book.description}</p>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#bookCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#bookCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
        <h3>No Books Found :(</h3>
      )}
    </>
  );
};

export default BestBooks;
