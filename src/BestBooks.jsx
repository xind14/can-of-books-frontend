import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
// import Alert from 'react-bootstrap/Alert';
// import Button from 'react-bootstrap/Button';
import EmptyLibrary from './Components/EmptyLibrary';

let url = import.meta.env.VITE_LOCAL_SERVER;


  
function BestBooks(props) {
  const [books, setBooks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  const FetchBooks = async () => {
    try {
      let response = await axios.get(`${url}/books`);
      setBooks(response.data);
      if (response.data.length === 0) {
        setShowAlert(true);
        return <EmptyLibrary show={showAlert}/>; 
      } 
    } catch (error) {
      console.log('error'); 
      }
  };
  
    if (books.length > 0) {  
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

  useEffect(() => {
    console.log("Mount up")
    FetchBooks();
    return () => {
      console.log("Unmount");
    }
  }, []);
  }

//   useEffect(() => {
//     FetchBooks();  
//   }, [books])
//   }
// }

export default BestBooks;
