
import React, { useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { Image } from 'react-bootstrap';
// import Alert from 'react-bootstrap/Alert';
// import Button from 'react-bootstrap/Button';
import EmptyLibrary from './Components/EmptyLibrary';

const url = import.meta.env.VITE_LOCAL_SERVER;
console.log(url);

  
function BestBooks(props) {
  const [books, setBooks] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

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
    console.log("Mount up")
    FetchBooks();
    return () => {
      console.log("Unmount");
    }
  });
  
    if (books.length > 0) {  
      return (
        <>
          <Carousel>
            {/* <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2> */}
            {books.map((book) => {
              return(
                <Carousel.Item key={book._id}>
                  <Image style ={{width: '100%'}}src='/images/placeholder.png' alt='image of bookcover' />
                  <Carousel.Caption>
                    <h3>{book.title}</h3>
                    <p>{book.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );           
            })}
          </Carousel>
        </>
      );
  }
  return <EmptyLibrary show={showAlert}/>; 
}

//   useEffect(() => {
//     FetchBooks();  
//   }, [books])
//   }
// }

export default BestBooks;







