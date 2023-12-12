import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {
//   BrowserRouter as Router,
  // Routes,
  // Route
// } from "react-router-dom";

function App () {

  const [getBooks, setGetBooks] = useState(false);
  const handleGetBooks = () => {
    setGetBooks(true);
  };

  return (
    <>
      {/* <Router> */}
          <Header handleGetBooks={handleGetBooks} />
          <BestBooks getBooks={getBooks} />
          {/* <Routes>
          <Route 
              exact path="/"
              element={<BestBooks getBooks={getBooks} />}
              >
            </Route> */}
            {/* <Route 
              exact path="/about"
              // element={< />}
              >
            </Route> */}
            {/* <Route 
              exact path="/books"
              element={<BestBooks />}
              >
            </Route> */}
            {/* PLACEHOLDER: add a route with a path of '/about' that renders the `About` component */}
          {/* </Routes> */}
          <Footer />
        {/* </Router> */}
      </>
  )
}

export default App;
