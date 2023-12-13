import React, { useState } from 'react';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import EmptyLibrary from './Components/EmptyLibrary';


function App () {

  // const [getBooks, setGetBooks] = useState(false);
  // const handleGetBooks = () => {
  //   setGetBooks(true);
  // };

  return (
    <>
      <Router>
        <Header />
        {/* <BestBooks getBooks={getBooks} /> */}
        <Routes>
          <Route 
            exact path="/"
            element={<Home />}
            >
          </Route>
          <Route 
            exact path="/books"
            element={<BestBooks />}
            >
          </Route>
          <Route 
            exact path="/about"
            element={<About />}
            >
          </Route>
        </Routes>
      <Footer />
    </Router>
  </>
  )
}

export default App;